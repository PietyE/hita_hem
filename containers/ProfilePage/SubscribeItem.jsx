import React, {useEffect, useState} from 'react';

const SubscribeItem = ({data, unsubscribes, changeUnsubscribesList}) => {
    const [isOn, setIsOn] = useState(true);


    useEffect(() => {
        if (unsubscribes?.length > 0) {
            const isUnsubscribe = unsubscribes.find(el => el === data?.pk)
            if (isUnsubscribe) {
                setIsOn(false)
            }
        }
    }, [data, unsubscribes])

    const on =() => {
        setIsOn(true)
        changeUnsubscribesList(data?.pk)
    }
    const off =() => {
        setIsOn(false)
        changeUnsubscribesList(data?.pk)
    }


    return (
        <li className='subscribe_item'>
            <span className='subscribe_text'>{data.name} :</span>
            <div className='subscribe_inputs_container'>
                <label className={isOn ? 'subscribe_label active_radio' : 'subscribe_label'}>
                    on
                    <input
                        className='subscribe_input'
                        type='radio'
                        checked={isOn}
                        onChange={on}
                    />
                </label>
                <label className={isOn ? 'subscribe_label' : 'subscribe_label active_radio'}>
                    off
                    <input
                        className='subscribe_input'
                        type='radio'
                        checked={!isOn}
                        onChange={off}
                    />
                </label>
            </div>

        </li>
    );
}

export default SubscribeItem;