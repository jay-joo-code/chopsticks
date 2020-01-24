import BootPay from "bootpay-js";
import log from 'src/util/log';
import axios from 'axios';
import getTotalPrice from 'src/util/calculation/getTotalPrice';

const cartTransaction = async (userId) => {
  try {
    // USER
    const { data: user } = await axios.get(`/api/user/${userId}`);
    if (!user) throw new Error('Invalid userId provided');
    const userInfo = {
      username: user.email.split('@')[0],
      email: user.email,
      addr: '',
      phone: ''
    }
    
    // CART
    const { cart } = user;
    let grandTotalAcc = 0;
    if (!cart || cart.length === 0) throw new Error('Invalid or empty cart');
    const items = cart.map((cartObj) => {
      const totalPrice = getTotalPrice(cartObj);
      const priceWithDeliv = totalPrice + cartObj.item.deliveryCost;
      grandTotalAcc += priceWithDeliv;
      return {
        item_name: cartObj.item.name,
        qty: cartObj.quantity,
        unique: cartObj.item._id,
        price: priceWithDeliv,
        cat1: cartObj.item.style,
        cat2: cartObj.item.category
      }
    })
    const transactionName = `${cart[0].item.name} 등 ${cart.length}개 상품`
    
    // TRANSACTION
    const reqData = {
      price: grandTotalAcc,
      application_id: '5e293e0602f57e00366eebe1',
      name: transactionName,
      pg: 'inicis',
      method: 'card',
      show_agree_window: 0,
      items: items,
      user_info: userInfo,
      order_id: 'must provide',
    }
    BootPay.request(reqData)
      .error((e) => {
        log(`ERROR bootpay transaction request`);
      })
      .cancel((data) => {
        log(`transaction canceled`, data);
      })
      .confirm((data) => {
        log(`transaction ready for validation`, data);
        var passedValidation = true;
        if (passedValidation) {
          BootPay.transactionConfirm(data);
        }
        else {
          BootPay.removePaymentWindow();
        }
      })
      .close((data) => {
        log(`transaction window closed`, data);
      })
      .done((data) => {
        log(`transaction complete`, data);
        // TODO: SERVER-SIDE TRANSACTION VALIDATION
      });
  } catch (e) {
    log(`ERROR cartTransaction`, e);
  }
}

export default cartTransaction;
