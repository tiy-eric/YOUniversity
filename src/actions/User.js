import request from 'superagent';

// const baseUrl = 'http://localhost:8080';
const baseUrl = 'https://youniversity1.herokuapp.com'

export function login(user) {

    return dispatch => {
        return request.put(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .on("error", error => console.error("could not login user" + error))
        .then(
            (response) => {
                
                localStorage.setItem("currentUser", JSON.stringify(response.body));

                dispatch({ type: 'USER_LOGIN', result: response.body });

            }
        )
    }
}

export function logout() {
    
    return dispatch => {
        request.delete(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send()
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not logout user" + error);
                    return;
                }
                
                localStorage.removeItem("currentUser");

                dispatch({ type: 'USER_LOGOUT', result: response.body });

            }
        )
    }
}

export function register(user) {
    
    return dispatch => {
        request.post(`${baseUrl}/user/create`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not create user" + error);
                    return;
                }

                dispatch({ type: 'USER_REGISTERED', result: response.body });

            }
        )
    }
}

export function updateUser(user) {
    
    return dispatch => {
        request.put(`${baseUrl}/user`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not update user" + error);
                    return;
                }

                localStorage.setItem("currentUser", JSON.stringify(response.body));

                dispatch({ type: 'USER_UPDATED', result: response.body });

            }
        )
    }
}

export function addSchoolToFavoriteList(listID, school) {
    
    return dispatch => {
        request.post(`${baseUrl}/list/${listID}/add`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(school)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not add school to user's favorite list" + error);
                    return;
                }

                dispatch({ type: 'FAVORITE_ADDED', result: response.body });

            }
        )
    }
}

export function deleteSchoolFromFavoriteList(listID, school) {
    
    return dispatch => {
        request.delete(`${baseUrl}/list/${listID}/delete/${school}`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(school)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not delete school from user's favorite list" + error);
                    return;
                }

                dispatch({ type: 'FAVORITE_DELETED', result: response.body });

            }
        )
    }
}

export function refreshUser() {
    
    return dispatch => {
        request.get(`${baseUrl}/user`)
        .withCredentials()
        .send()
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not update user" + error);
                    return;
                }

                localStorage.setItem("currentUser", JSON.stringify(response.body));

                dispatch({ type: 'USER_REFRESHED', result: response.body });

            }
        )
    }
}
