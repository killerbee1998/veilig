## Veilig(The new password manager)

This repo is contains the backend api of veilig

API calls:

**GET requests:**

1. / -> Root path. 0 Arguments 
Currently shows a simple message. Planned to transform into the help menu in the future

2. /pass/len=:len/passFlags=:flags -> Path to generate passwords. 2 Params( len: length of password, passFlags: flags to keep in mind when generating passwords. A detailed description of flags is given bellow)
Using this returns a password with the desired length and intended flags. Passwords must have at least 5 characters and at most 200 characters.

3. /passphrase/n_words=:n_words/passFlags=:flags -> Path to generate passphrases. 2 Params( n_words: number of words of the passphrase, passFlags: flags to keep in mind when generating passwords. A detailed description of flags is given bellow)
Using this returns a passphrase with the desired number of words and intended flags.Passwords must have at least 3 words and at most 20 words.

**POST requests**

1. account/register -> Path to register user. 2 Arguments in JSON body( email: email of user, pass: password of user)
An user can only register once. attempting to register multiple times will yield a REGISTRATION ERROR.
Empty emails/passwords will also yield a REGISTRATION ERROR

2. account/login -> Path to login user. 2 Arguments in JSON body( email: email of user, pass: password of user)
Wrong/Empty emails/passwords will  yield a LOGIN ERROR
Returns a jwt token with its key for auth.

3. account/del_acc -> Path to delete a user from the database.2 Arguments in JSON body( email: email of user, pass: password of user)
Wrong/Empty emails/passwords will  yield a ACCOUNT DELETETION ERROR

4. store/savePass -> Path to save user password. 5 arguments in body( user_url: url of user password(can be blank),user_url: username of user password(can be blank), user_pass: password to be saved, token: jwt token gained from login, key: jwt key gained from login)
Wrong/Empty tokens and keys result in PASSWORD SAVE ERROR

5. store/displayPass -> Path to display user password. 2 arguments in body( token: jwt token gained from login, key: jwt key gained from login)
Wrong/Empty tokens and keys result in PASSWORD DISPLAY ERROR
Returns store_id and decrypted user_pass as an array of objects.

6. store/delPass -> Path to delete user password. 3 arguments in body( token: jwt token gained from login, key: jwt key gained from login, store_id: store_id of password to be deleted)
Wrong/Empty tokens and keys result in PASSWORD DELETETION ERROR
 

**Flag Descriptions:**
    
1. passFLag: Used in paths(/pass, /passphrase) to tailor custom passwords. 3 arguments(XXX), All binary(0/1)

    1. if_nums: Describes if password should have numbers or not. 0 means numbers are not allowed, 1 means numbers are allowed.

    2. if_specials: Describes if password should have special characters or not. 0 means special characters are not allowed, 1 means special characters are allowed.

    3. if_caps: Describes if password should have capital letters or not. 0 means capital letters are not allowed, 1 means capital letters are allowed.