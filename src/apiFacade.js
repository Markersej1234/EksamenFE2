//const URL = "http://localhost:8080/backend_start_war_exploded";
const URL = "https://markgn.dk/tomcat/backend_start";

function handleHttpErrors(res) {
  if (!res.ok) {
  console.log(res.status)
  return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}


function apiFacade() {

const login = (user, password) => {    
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(URL + "/api/login", options).then(handleHttpErrors).then(res => {setToken(res.token)})
}

const fetchData = (ressource) => { 
    const options = makeOptions("GET",true, null); //True add's the token
    return fetch(URL + ressource, options).then(handleHttpErrors);
}

const makeOptions= (method,addToken,body) => {
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
}


const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

function readJWTTokken(token) {
    console.log('TOKEN: ', token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}

const createIngredient = (ingredient) => {
  const options = makeOptions("POST",true, ingredient); //True add's the token
  return fetch(URL + `/api/ingredient/create`, options).then(r => r.json());
}

const getAllIngredients = () => {
  const options = makeOptions("GET",true, null);
  return fetch(URL + `/api/ingredient/all`, options).then(r => r.json());
}

const deleteIngredient = (ingredients) => {
  const options = makeOptions("DELETE", true, null); //True add's the token
  return fetch(URL + `/api/ingredient/delete/`+ingredients, options).then(r => r.json());
}



 return {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  readJWTTokken,
  getAllIngredients,
  createIngredient,
  deleteIngredient,

 }
}

const facade = apiFacade();
export default facade;
