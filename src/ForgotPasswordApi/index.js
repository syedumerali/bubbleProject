import config from '../config/index';

export const checkConfig = () => {

    if (config.url === '') {
        return false
    }

    else {

        return true
    }
}

let WC = null;

export default WC = {

    // get: (endpoint, params, success, error) => {

    //     if (checkConfig()) {

    //         let parameter = ""
    //         Object.entries(params).forEach(
    //             ([key, value]) => {
    //                 let val = "&" + key + "=" + value
    //                 let prev = parameter
    //                 parameter = prev + val
    //             }
    //         )

    //         let url = config.url + 'wp-json/wc/v3/' + endpoint + '?consumer_key=' + config.consumer_key + '&consumer_secret=' + config.consumer_secret + parameter;

    //         console.log('url', url);

    //         fetch(
    //             url, {
    //             method: 'GET'
    //         })
    //             .then(response => {

    //                 response.json()
    //                     .then(
    //                         response => {

    //                             if (response.status === 'error') {
    //                                 console.log('error', response.status)
    //                                 error(response)
    //                             }
    //                             else {
    //                                 console.log('response', response)
    //                                 success(response)
    //                             }
    //                         }
    //                     ).catch(e => {

    //                         error('something went wrong')

    //                     })
    //             })
    //             .catch(e => {
    //                 error(e)
    //             })
    //     }

    //     else {

    //         return
    //     }

    // },

    post: (endpoint, params, success, error) => {
        
 console.log('pa',params)
        let parameter = ""

        Object.entries(params).forEach(
            ([key, value]) => {
                let val = key + "=" + value
                let prev = parameter
                parameter = prev + val
            }
        )

        if (checkConfig()) {
            // let url = config.url + "wp-json/wc/v3/" + endpoint + "?consumer_key=" + config.consumerKey + "&consumer_secret=" + config.consumerSecret + "&oauth_signature=" + config.auth
            let url = config.url + "wp-json/api/v1/" + endpoint +parameter

            console.log("uri ", url);
        
            // console.log('requesting with config', requestConfig)
            fetch( url, {
                method: 'POST'
            })
                .then(d => {
                    d.json()
                        .then(
                            data => {
                            console.log('data',data)
                                if (data.status === "error") {
                                    // console.log('in error', data);

                                    error(data)
                                } else {
                                    // console.log('in success', data);
                                    success(data)
                                }
                            }
                        )
                })
                .catch(e => {
                    error(e)
                })
        } else {
            // console.log('Missing config')
            return
        }

    },

    get: (endpoint,success, error) => {
    
        if (checkConfig()) {
            // let url = config.url + "wp-json/wc/v3/" + endpoint + "?consumer_key=" + config.consumerKey + "&consumer_secret=" + config.consumerSecret + "&oauth_signature=" + config.auth
            let url = config.url + "wp-json/api/v1/" + endpoint 

            console.log("uri ", url);
        
            // console.log('requesting with config', requestConfig)
            fetch( url, {
                method: 'GET'
            })
                .then(d => {
                    d.json()
                        .then(
                            data => {
                            console.log('data',data)
                                if (data.status === "error") {
                                    // console.log('in error', data);

                                    error(data)
                                } else {
                                    // console.log('in success', data);
                                    success(data)
                                }
                            }
                        )
                })
                .catch(e => {
                    error(e)
                })
        } else {
            // console.log('Missing config')
            return
        }

    },


    // auth: (credentials, success, error) => {
    //     if (checkConfig()) {
    //         if (credentials) {
    //             console.log('check',credentials)
    //             if (!credentials.email) {
    //                 console.log('Email required')
    //                 return
    //             }
    //             if (!credentials.password) {
    //                 console.log('password required')
    //                 return
    //             }
    //             let url = config.url + "api/auth/generate_auth_cookie/?insecure=cool&username=" + credentials.email + "&password=" + credentials.password

    //              console.log('URL ',url)

    //             fetch(url)
    //                 .then(data => {


    //                     console.log('The data in login :', data);
    //                     data.json()
    //                         .then(
    //                             d => {
    //                                 console.log('d :', d);
    //                                 if (d.status === "error") {
    //                                     // console.log('in error', data);
    
    //                                     error(d)
    //                                 } else {
    //                                     // console.log('in success', data);
    //                                     success(d)
    //                                 }
    //                             })
    //                         .catch(e => {
    //                             console.log('err ', e.message);
    //                             return error(e)
    //                         })
    //                 }).catch(e => {
    //                     console.log('err2 ', e);
    //                     if (e?.message == 'Network request failed')
    //                         return error('No internet connection')
    //                     else {
    //                         console.log('err3 ', e);
    //                         return error(e)
    //                     }
    //                 })
    //         } else {

    //             //
    //             console.log('missing configuration object with username and password')
    //             return
    //         }
    //     }
    // },
}