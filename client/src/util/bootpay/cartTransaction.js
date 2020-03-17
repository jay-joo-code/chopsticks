import BootPay from "bootpay-js";
import generator from 'generate-password';
import axios from 'axios';
import getTotalPrice from 'src/util/calculation/getTotalPrice';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';

const cartTransaction = (userId, method) => {
  return new Promise(async(resolve, reject) => {
    try {
      // TRANSACTION METHOD
      if (!method || (method !== 'card' && method !== 'vbank')) {
        throw new Error('Invalid transaction method')
      }
      
      // USER
      const { data: user } = await axios.get(`/api/user/${userId}`);
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
          var passedValidation = true;
          if (passedValidation) {
            BootPay.transactionConfirm(data);
          }
          else {
            BootPay.removePaymentWindow();
          }
        })
        .close((data) => {
        })
        .done((data) => {
          axios.post(`/api/transaction/${data.receipt_id}/process`, { transaction })
            .then((res) => {
              fetchSelfAndStore(user._id);
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
