import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;



const UIPub = () => {
  return (
    <Container>
    <div class="p_cont_row">
      <div class="checks">
          <input id="p1" type="checkbox" />
          <label for="p1">
          </label>
      </div>
      <div class="cont1">
          <b>#1234567</b>
          2019-02-12
      </div>
      <div class="cont2">
          KANGSEOK SEO
      </div>
      <div class="cont3">
          <p class="img"><img src="/img/temp.jpg" /></p>
          <div class="txt">
              <p class="tlt">Ocean view suncatcher</p>
              <span>2, Big size</span>
              <p class="price">$12</p>
          </div>
      </div>
      <div class="cont4">
          <span class="add_box">
          1200 ST-ALEXANDRE, QC, CANADA
          H3B 3H5
          </span>
      </div>
      <div class="cont5">
          <select class="sel_box sel_box_13">
              <option>
                  Korean Post
              </option>
              <option>
                  Korean Post
              </option>
              <option>
                  Korean Post
              </option>
          </select>
      </div>
      <div class="cont6">
          <input class="input_st input_sz_10" value="12345678" />
      </div>
      <div class="cont7">
          <a href="#" class="btn_st_17">발송완료</a>
      </div>
      <a href="#" class="p_option">edit</a>
    </div>
    </Container>
  )
};

export default UIPub;
