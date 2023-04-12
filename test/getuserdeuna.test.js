const {getListUserDeUna} = require("../service/getListDeUnaUser");
const {getallListUserDeUna} = require("../service/getListDeUnaUser");
describe('getUserDeUna', () => {
    it('should return a user object', async () => {
        const user = await getListUserDeUna('0984432937');
        expect(user).toEqual('893217');
    });
    it('should return a user object', async () => {
        const user = await getallListUserDeUna();
        console.log(user)
        ;
    });
    }
);
