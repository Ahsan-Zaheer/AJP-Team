import bcrypt from 'bcrypt'

const password = "AjProduction2@";
bcrypt.hash(password, 10).then(hash => {
    console.log("Hashed:", hash);
    bcrypt.compare(password, hash).then(match => {
        console.log("Does it match?", match); // Should be true
    });
});
