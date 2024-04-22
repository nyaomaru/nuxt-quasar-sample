export default defineEventHandler(event => {
  console.log('Nyaomaru request: ' + getRequestURL(event));
});
