import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { notifyReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {notifyReducer.loading && <Loading />}

            {
                notifyReducer.error && 
                <Toast msg={{title: 'Error', body: notifyReducer.error}}
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} 
                bgColor="bg-danger" />
            }

            {
                notifyReducer.success && 
                <Toast msg={{title: 'Success', body: notifyReducer.success}} 
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                bgColor="bg-success" />
            }
        </div>
    )
}

export default Notify
