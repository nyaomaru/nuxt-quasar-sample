const customerDetail = [
  { id: 1, name: 'nyaomaru1', location: 'Japan', hobby: 'sleeping', age: 3 },
  { id: 2, name: 'nyaomaru2', location: 'Netherlands', hobby: 'eating', age: 4 },
  { id: 3, name: 'nyaomaru3', location: 'United States', hobby: 'playing', age: 5 },
];

export default defineEventHandler(event => {
  const query = getQuery(event);

  return customerDetail.find(customer => String(query.id) === String(customer.id));
});
