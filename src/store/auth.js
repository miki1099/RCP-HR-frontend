
function handleErrors(response) {
    if (response.status == 401 || response.status == 404) {
        throw new Error('Your credentials are incorrect!');
    } else {
        return response;
    }
}

export default {
    state() {
        return {
            login: null,
            roles: [],
            name: null
        };
    },
    mutations: {
        setUser(state, payload) {
            state.login = payload.login;
            state.roles = payload.roles;
            state.name = payload.name;
        },
        logout(state) {
            localStorage.removeItem('login');
            localStorage.removeItem('roles');
            localStorage.removeItem('name');
            state.login = null;
            state.roles = [];
            state.name = null;
        }
    },
    actions: {
        async login(context, payload) {

            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:8082/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    username: payload.login,
                    password: payload.password
                })
            })
                .then(handleErrors)
                .catch(error => {
                    console.log(error);
                    if (error.message === null || error.message === 'Failed to fetch') {
                        throw new Error('Logowanie nie powiodło się. Spróbuj ponownie później');
                    } else {
                        throw new Error(error.message);
                    }
                });

            const responseData = await response.json();

            let rolesBuf = []
            for(let role of responseData.roles) {
                rolesBuf.push(role.name)
            }

            localStorage.setItem('login', responseData.username);
            localStorage.setItem('roles', rolesBuf);
            localStorage.setItem('name', responseData.firstName);

            context.commit('setUser', {
                login: responseData.username,
                roles: rolesBuf,
                name: responseData.firstName,
            });
        },
        async tryLogIn(context) {
            const login = localStorage.getItem('login');
            const roles = localStorage.getItem('roles');
            const name = localStorage.getItem('name');
            if (login) {
                context.commit('setUser', {
                    login: login,
                    roles: roles,
                    name: name
                });
            }
        }
    },
    getters: {
        getLogin: state => {
            return state.login;
        },
        isAuthenticated: state => {
            return !!state.login;
        },
        isHr: state => {
            let roleList = state.roles;
            if(roleList.includes('HR')) {
                return true
            }
            return false;
        },
        isManager: state => {
            let roleList = state.roles;
            if(roleList.includes('MANAGER')) {
                return true
            }
            return false;
        },
        getName: state => {
            return state.name;
        }
    }
}