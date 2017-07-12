import {api} from '../../api/api.js';
import axios from 'axios';

export function saveShare(type, first, second, now){
    axios({
        method: 'post',
        url: api + '/public/save_share_record',
        data: {
            shared_from_user: 0,
            shared_to_user: now,
            shared_platform: 0,
            shared_first_user: first,
            shared_second_user: second,
            register_user_type: type,
            shared_url: ''
        },  
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((res) => {
        console.log(first);
        console.log(second);
    })
    .catch((error) => {
        console.log('错误了'+ error)
    });
}