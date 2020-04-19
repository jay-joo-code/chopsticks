import BootPay from "bootpay-js";
import generator from 'generate-password';
import axios from 'axios';
import getTotalPrice from 'src/util/calculation/getTotalPrice';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import { sendAlertOnEvent } from 'src/util/bizm';
import api from 'src/util/api';
import log from 'src/util/log';
import store from 'src/redux/store';

const cartTransaction = (userId, method) => {
  return new Promise(async(resolve, reject) => {
    try {
      // TRANSACTION METHOD
      if (!method || (method !== 'card' && method !== 'vbank')) {
        throw new Error('Invalid transaction method')
      }
      
      // USER
      const { data: user } = await api.get(`/user/${userId}`);
      if (!user) throw new Error('Invalid userId provided');
      if (!user.deliveryInfo) throw new Error('No delievery info provided');
      const { options, defaultIndex } = user.deliveryInfo;
      const selectedDeliv = options[defaultIndex];
      const { address, addressDetail, mobile } = selectedDeliv;
      const userInfo = {
        username: user.email.split('@')[0],
        email: user.email,
        addr: `${address} ${addressDetail}`,
        phone: mobile
      }

      // CART
      const { cart } = user;
      const formattedCart = [];
      let grandTotalAcc = 0;
      if (!cart || cart.length === 0) throw new Error('Invalid or empty cart');
      const items = cart.map((cartObj) => {
        const itemPrice = getTotalPrice(cartObj);
        const priceWithDeliv = itemPrice + cartObj.item.deliveryCost;
        grandTotalAcc += priceWithDeliv;

        cartObj.priceNoDeliv = itemPrice;;
        cartObj.price = priceWithDeliv;
        formattedCart.push(cartObj);

        return {
          item_name: cartObj.item.name,
          qty: cartObj.quantity,
          unique: cartObj.item._id,
          price: priceWithDeliv,
          cat1: cartObj.item.style,
          cat2: cartObj.item.category
        }
      })
      const transactionName = `${cart[0].item.name} 등 ${cart.length}개 상품`;

      const transaction = {
        deliv: selectedDeliv,
        cart: formattedCart,
        price: grandTotalAcc,
        buyer: user._id,
      }
      
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const tmr = new Date(currentDate).toISOString().slice(0, 10);

      // TRANSACTION REQUEST DATA
      const reqData = {
        price: grandTotalAcc,
        application_id: '5e293e0602f57e00366eebe1',
        name: transactionName,
        pg: 'danal',
        method,
        show_agree_window: 0,
        items: items,
        user_info: userInfo,
        order_id: generator.generate({ length: 16, numbers: false }),
        account_expire_at: tmr,
        extra: {
          vbank_result: 1
        }
      }

      // REQUEST
      BootPay.request(reqData)
        .error((e) => {
          reject(e);
        })
        .cancel((data) => {
          reject(data);
        })
        .ready((data) => {
          console.log('vbank ready', data);
        })
        .confirm((data) => {
          // 재고 validation
          let passedValidation = true;
          
          cart.map((cartObj) => {
            const { optionsIndex, item } = cartObj;
            const matchedOpt = item.optData.filter((opt) => {
              return opt.index.join() === optionsIndex.join()
            });
            if (!matchedOpt.length) {
              passedValidation = false;
            }
            else {
              const targetOpt = matchedOpt[0];
              if (!targetOpt.qty) {
                // 재고 없음
                passedValidation = false;
              }
              else if (targetOpt.qty < cartObj.quantity) {
                // 카트에 담긴 주문 수량보다 재고가 적음
                passedValidation = false;
              }
            }
          })
          
          if (passedValidation) {
            BootPay.transactionConfirm(data);
          }
          else {
            store.dispatch({
              type: 'ALERT_SET', 
              payload: {
                show: true,
                msg: '재고가 없습니다',
                color: 'danger'
              }
            })
            BootPay.removePaymentWindow();
          }
        })
        .close((data) => {
        })
        .done((data) => {
          api.post(`/transaction/${data.receipt_id}/process`, { transaction })
            .then((res) => {
              fetchSelfAndStore(user._id);
              
              // send kakao alerts
              cart.map((cartObj) => {
                const { item, quantity } = cartObj;
                const number = item.owner.mobile;
                const data = {
                  itemName: item.name,
                  optsString: cartObj.optString,
                  qty: quantity,
                  buyerName: user.name,
                  url: 'https://chopsticks.market/shop/admin/orders',
                }
                sendAlertOnEvent(number, 'NEW_ORDER', data);  
              })
              
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            })
        });
    }
    catch (e) {
      reject(e)
    }
  })
}

export default cartTransaction;
