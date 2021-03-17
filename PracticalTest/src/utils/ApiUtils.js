const TAG = "ApiUtils"

class ApiUtils {
    static headers() {
        return {
            'Accept': 'application/json',
        }
    }

    static get(route) {
        return this.webserviceExplorer(route, null, 'GET');
    }

    static webserviceExplorer(route, params, verb) {
        let options = { method: verb }
        console.log(TAG, "url : ", route)

        return fetch(route, options).then(resp => {
            console.log(TAG, "resp : ", resp)
            if (resp.status == 404) {
                alert("No data found")
            }
            let json = resp.json();
            if (resp.ok) {
                return json;
            }

            return json.then(err => {
                console.log("error :", err)
                throw err
            });

        }).then(json => json);
    }
}

export default ApiUtils