// function listen(){
//     app.listen(9090, (err) => {
//         if(err){
//             console.log(err)
//         } else {
//             console.log("listening on 9090")
//         }
//     })
// }
// module.exports = listen;

const app = require('./app')
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
