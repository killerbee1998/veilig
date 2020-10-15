Veilig(The new password manager)

This repo is contains the backend api of veilig

API calls:

    1. / -> Root path. 0 Arguments 
    Currently shows a simple message. Planned to transform into the help menu in the future

    2. /pass/len=:len/passFlags=:flags -> Path to generate passwords. 2 Arguments( len: length of password, flags: flags to keep in mind when generating passwords. A detailed description of flags is given bellow)

    Using this returns a password with the desired length and intended flags.