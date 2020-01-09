import React from 'react';
import styled from 'styled-components';
import SectCont from './../SectCont';

const Container = styled.div`

`;

const SectThree = ({ formik }) => {
  return (
    <SectCont>
        
                    <ul>
                        <li>
                            <p class="tlt">
                                제작기간
                            </p>
                            <div class="cont">
                                <select class="sel_box sel_box_10 mr">
                                    <option>1일</option>
                                </select>
                                <span class="date_">-</span>
                                <select class="sel_box sel_box_10">
                                    <option>1일</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <p class="tlt">
                                배송기간
                            </p>
                            <div class="cont">
                                <select class="sel_box sel_box_10 mr">
                                    <option>1일</option>
                                </select>
                                <span class="date_">-</span>
                                <select class="sel_box sel_box_10 ">
                                    <option>1일</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <p class="tlt">
                                비용
                            </p>
                            <div class="cont">
                                <select class="sel_box sel_box_11">
                                    <option>Fixed cost</option>
                                </select>
                                <input class="input_st input_sz_09" />
                            </div>
                        </li>
                    </ul>
                    <span class="c_txt pc">* Buyers are more likely to purchase items that ship quickly</span>
                
    </SectCont>
  )
};

export default SectThree;
