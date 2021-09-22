import fetch from 'node-fetch';

const sheet_id = "116LycNEkWChmHmDK2HM2WV85fO3p3YTYDATpAthL8_g"
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Main%20Catalog?key=AIzaSyDlvXmAhL_BbD6f6xtej_naf4oxgHOLXns`

interface Response {
    values: string[][]
}

export class MCatalogService {
    static async getCatalog(): Promise<Response> {
        return fetch(url).then((res) => { return res.json() })
                         .catch((err) => { throw new Error(err) });
    }
}
