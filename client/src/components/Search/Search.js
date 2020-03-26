import React, {useState, useContext, Fragment} from 'react';
import {SearchContext} from '../../context/SearchContext';
import {Result} from './Result'; 

export const Search = () => {
  const {searchData, setSearchData} = useContext(SearchContext);
  const {search} = searchData;
  const activity_types = [
    {value: 'PLAY_A_GAME', text: 'Play a game'},
    {value: 'LEARN_SOMETHING_NEW', text: 'Learn something new'},
    {value: 'LEARN_A_PROFESSIONAL_SKILL', text: 'Learn a professional skill'},
    {value: 'SOMETHING_UNUSUAL', text: 'Something unusual'},
    {value: 'MAKE_A_CRAFT', text: 'Make a craft'},
    {value: 'GO_OUTSIDE', text: 'Go outside'},
    {value: 'DO_SOMETHING_SIMPLE', text: 'Do something simple'},
    {value: 'MAKE_ART', text: 'Make art'},
    {value: 'SPRUCE_THINGS_UP', text: 'Spruce things up'}
  ];
  const audiences = [
    {value: 'BY_MYSELF', text: 'By myself'},
    {value: 'WITH_MY_KIDS', text: 'With my kids'},
    {value: 'WITH_MY_PARTNER', text: 'With my partner'},
    {value: 'WITH_MY_FRIENDS', text: 'With my friends'},
  ];
  const onChange = e => {
    const {value, name} = e.target
    setSearchData({...searchData, [name]: value});
  }

  const onClick = e => {
    setSearchData({...searchData, search: true})
  }

  return (
    <Fragment>
    <div id='form' className='row'>
      <div className='col-12 col-md-10 offset-md-1'>
        <div id='activity-search-form' className='form__container px-2 py-2'>
          <div className='d-md-flex justify-content-center align-items-center'>
            <div className='mb-3 mb-md-0 pl-1' style={{ flexShrink: '0' }}>
              I want to:
            </div>

            <select
              name='activity_type'
              id='search-type'
              className='form-control mb-3 mb-md-0 mx-md-1'
              value = {searchData.activity_type}
              onChange={e => onChange(e)}
            >
              <option value='' disabled hidden>
                What do you want to do?
              </option>
              {activity_types.map(({value, text}) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>

            <select
              name='audience'
              id='search-audience'
              className='form-control mb-3 mb-md-0 mx-sm-1'
              value = {searchData.audience}
              onChange={e => onChange(e)}
            >
              <option value='' disabled hidden>
                With whom?
              </option>
              {audiences.map(({value, text}) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>

            <button
              id='go'
              className='btn btn-warning btn-block-xs ml-sm-1'
              onClick={e => onClick(e)}
            >Go!</button>
          </div>
          {/* <div className="form-inline">
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="search-free" name="free" value="1">
              <label className="form-check-label" for="search-free">Free activities only, please!</label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    {search ? <Result searchData={searchData}/> : null}
    </Fragment>
  );
};
