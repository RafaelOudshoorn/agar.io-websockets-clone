const rooms = [
    {
    id: 1,
    code: 1234,
    name: 'Room 1',
    players: [],
    maxPlayers: 4
    },
    {
    id: 2,
    code: 0000,
    name: 'Room 2',
    players: [],
    maxPlayers: 8
    }
];
function getRoomById(id) {
    return rooms.find((room) => room.id === id);
}