import React from 'react';

export const Search = () => {
  return (
    <div id='form' class='row'>
      <div class='col-12 col-md-10 offset-md-1'>
        <form id='activity-search-form' class='form__container px-2 py-2'>
          <div class='d-md-flex justify-content-center align-items-center'>
            <div class='mb-3 mb-md-0 pl-1' style={{ flexShrink: '0' }}>
              I want to:
            </div>

            <select
              name='type'
              id='search-type'
              class='form-control mb-3 mb-md-0 mx-md-1'
            >
              <option value='' selected disabled hidden>
                What do you want to do?
              </option>
            </select>

            <select
              name='audience'
              id='search-audience'
              class='form-control mb-3 mb-md-0 mx-sm-1'
            >
              <option value='' selected disabled hidden>
                With whom?
              </option>
            </select>

            <input
              type='submit'
              id='go'
              class='btn btn-warning btn-block-xs ml-sm-1'
              value='Go!'
            />
          </div>
          {/* <div class="form-inline">
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="search-free" name="free" value="1">
              <label class="form-check-label" for="search-free">Free activities only, please!</label>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};
