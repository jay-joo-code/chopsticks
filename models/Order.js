const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = Schema({
  deliv : {
    type: {
      recipient: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      addressDetail: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      company: String,
      companyCode: String,
      invoice: String,
    },
    required: true,
  },
  bootpay : {
    type: Object,
    required: true,
  },
  cartObj: {
    type: Object,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  state: {
    // new pending delivering complete confirmed
    // (복제 주문건) exchangeRequested exchangePending exchangeRejected
    // refundRequested refundPending refunded refundRejected
    // cancelRequested canceled cancelRejected
    // error
    type: String,
    required: true,
    default: 'new',
  },
  stateMsg: {
    // 교환, 환불, 취소 사유 메세지
    type: String,
  },
  stateText: {
    // 교환주문건이 배송중으로 이동되도 (교환건) 텍스트 유지되게끔
    type: String,
  },
  linkedOrderId: {
    // 교환 시 관련 주문건 id 를 저장
    // 교환 주문건: 기존 주문건
    // 기존 주문건: 교환 주문건
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  hideToBuyer: {
    // 교환 신청 시 기존 주문건은 구매자에게 안보인다
    type: Boolean,
    default: false,
  },
  seen: {
    // TODO: remove seen property
    type: Boolean,
    required: true,
    default: false,
  }
},
{
  timestamps: true,
});

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema);