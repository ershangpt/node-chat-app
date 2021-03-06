const expect = require("expect");

const {Users} = require("./users");

describe('Users', () => {
    var users;

    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'Node Room'
        },{
            id: '2',
            name: 'jan',
            room: 'React Room'
        },{
            id: '3',
            name: 'ria',
            room: 'Node Room'
        }]
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'shashank',
            room: 'my fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    })

    it('should not find user', () => {
        var userId= "44";
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    })

    it("should remove a user", ()=> {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2)
    })

    it("should not remove a user", ()=> {
        var userId= '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should return names for node room', () => {
        var userList = users.getUserList('Node Room');

        expect(userList).toEqual(['mike', 'ria']);
    })

    it('should return names for react room', () => {
        var userList = users.getUserList('React Room');

        expect(userList).toEqual(['jan']);
    })
})

