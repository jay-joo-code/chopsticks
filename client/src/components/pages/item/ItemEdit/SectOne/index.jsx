import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';
import InputCont from './../InputCont';
import OutlinedInput from 'src/components/common/form/OutlinedInput';

const SectOne = ({ formik }) => {
  return (
    <SectCont>
      <InputCont>
        <OutlinedInput
          name="name"
          label="상품 이름 *"
          formik={formik}
        />
      </InputCont>
                    <li>
                        <p class="tlt">
                            Category *
                        </p>
                        <div class="cont">
                            <div class="sel_box sel_box_08">candle in Container Candles</div>
                            <div class="sel_option pc">
                            </div>
                        </div>
                    </li>
                    <li class="lc">
                        <p class="tlt">
                            Contents *
                        </p>
                        <div class="cont">
                            <textarea class="txtr3"></textarea>
                        </div>
                    </li>
      <InputCont>
        <OutlinedInput
          name="price"
          label="가격 *"
          formik={formik}
        />
      </InputCont>
      <InputCont>
        <OutlinedInput
          name="stock"
          label="재고 *"
          formik={formik}
        />
      </InputCont>
                    
                    
                        <p class="tlt">
                            Quantity
                        </p>
                        <div class="cont">
                            <input class="input_st input_sz_06" />
                            <div class="checks">
                                <input id="set" type="checkbox" />
                                <label for="set">
                                    주문 후 제작
                                </label>
                            </div>
                        </div>
                    
    </SectCont>
  )
};

export default SectOne;
