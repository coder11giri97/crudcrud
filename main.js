window.addEventListener("DOMContentLoaded", showData());

const form = document.getElementById("my-form");

form.addEventListener("submit", saveData);

function saveData(e){
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const obj = {
        name: name,
        email: email
    }
//     localStorage.setItem(email, JSON.stringify(obj));
    axios.post('https://crudcrud.com/api/ece409c951754bd9af2964b7f91783de/appointments', obj)
        .then((res) => {
            console.log(res.data);
            document.getElementById("name").value = "";
            document.getElementById("email") = "";
        }).catch(err => {
            console.log(err);
        })
 }

function showData(){
    axios.get("https://crudcrud.com/api/ece409c951754bd9af2964b7f91783de/appointments")
        .then(res => {
            const ul = document.getElementById("users");
            res.data.forEach(el => {
                const newUser = `<li id=${el._id}>${el.name} : ${el.email}
                                    <button onclick=deleteUser('${el._id}')> Delete</button>
                                    <button onclick=EditUser('${el}')> Edit</button>
                                </li>`

                ul.innerHTML = ul.innerHTML + newUser;
            })
        })
        .catch(err => {
            console.log(err);
        })
    // if(localStorage.length){
    //     const users = [];
    //     for(let i=0; i<localStorage.length; i++){
    //         const k = localStorage.key(i);
    //         users.push(JSON.parse(localStorage.getItem(k)));
    //     }
    //     const ul = document.getElementById("users");
    //     users.forEach(user => {
    //         const newUser = `<li id=${user.email}>${user.name} : ${user.email}
    //                             <button onclick=deleteUser('${user.email}')> Delete</button>
    //                             <button onclick=EditUser('${user.email}')> Edit</button>
    //                         </li>`

    //         ul.innerHTML = ul.innerHTML + newUser;
    //     })
    // }
    
}

function deleteUser(_id){
    axios.delete(`https://crudcrud.com/api/ece409c951754bd9af2964b7f91783de/appointments/${_id}`)
        .then(() => {
            console.log("Deleted!");
            removeFromUI(_id);

        })  
        .catch(err => {
            console.log(err);
        })


    // localStorage.removeItem(email);
    // removeFromUI(email);
}

function removeFromUI(id){
    const parent = document.getElementById("users");
    const toBeDeleted = document.getElementById(id);
    parent.removeChild(toBeDeleted);
}

function EditUser(el){
    // const user =  JSON.parse(localStorage.getItem(email));
    const nameInput = document.getElementById("name");
    nameInput.value = el.name;
    const emailInput = document.getElementById("email");
    emailInput.value = el.email;

    removeFromUI(el._id);

    document.getElementById("btn").addEventListener("click", (e) => {
        const obj = {
            name: nameInput.value,
            email: nameInput.value
        }
        console.log(obj);

        axios.put(`https://crudcrud.com/api/ece409c951754bd9af2964b7f91783de/appointments/${el._id}`)
            .then(() => showData())
            .catch(err => console.log(err));

    })
}
