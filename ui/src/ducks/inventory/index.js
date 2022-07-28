import axios from 'axios'
import { createAction, handleActions } from 'redux-actions'
import alertHandleActions from '../alerts/index'
import { openSuccess } from '../alerts/index'

const actions = {
  INVENTORY_GET_ALL: 'inventory/get_all',
  INVENTORY_GET_ALL_PENDING: 'inventory/get_all_PENDING',
  INVENTORY_CREATE: 'inventory/create',
  INVENTORY_DELETE: 'inventory/delete',
  INVENTORY_REFRESH: 'inventory/refresh'
}

export let defaultState = {
  all: []
}

export const findInventory = createAction(actions.INVENTORY_GET_ALL, () =>
  (dispatch, getState, config) => axios
    .get(`${config.restAPIUrl}/inventory`)
    .then((inventory) => {
      dispatch(refreshInventory(inventory.data))
      dispatch(alertHandleActions(openSuccess))
    })
)

export const createInventory = createAction(actions.INVENTORY_CREATE, (inventory) =>
  (dispatch, getState, config) => axios
    .post(`${config.restAPIUrl}/inventory`, inventory)
    .then((response) => {
      const allInventory = []
      getState().products.all.forEach(individual => {
        if (individual.id !== response.data.id) {
          allInventory.push(individual)
        }
      })
      allInventory.push(response.data)
      dispatch(refreshInventory(allInventory))
      dispatch(alertHandleActions(openSuccess))
    })
)

export const refreshInventory = createAction(actions.INVENTORY_REFRESH, (payload) =>
  (dispatcher, getState, config) =>
    payload.sort((inventoryA, inventoryB) => inventoryA.name < inventoryB.name ? -1 : inventoryA.name > inventoryB.name ? 1 : 0)
)

export default handleActions({
  [actions.INVENTORY_GET_ALL_PENDING]: (state) => ({
    ...state,
    fetched: false
  }),
  [actions.INVENTORY_REFRESH]: (state, action) => ({
    ...state,
    all: action.payload,
    fetched: true,
  })
}, defaultState)
