## Veilig(The new password manager)

This repo is contains the backend api of veilig

API calls:

    **GET requests:**

    1. / -> Root path. 0 Arguments 
    Currently shows a simple message. Planned to transform into the help menu in the future

    2. /pass/len=:len/passFlags=:flags -> Path to generate passwords. 2 Arguments( len: length of password, passFlags: flags to keep in mind when generating passwords. A detailed description of flags is given bellow)

    Using this returns a password with the desired length and intended flags.

    3. /passphrase/n_words=:n_words/passFlags=:flags -> Path to generate passphrases. 2 Argument( n_words: number of words of the passphrase, passFlags: flags to keep in mind when generating passwords. A detailed description of flags is given bellow)

    Using this returns a passphrase with the desired number of words and intended flags.



Flag Descriptions:
    
    1. passFLag: Used in paths(/pass, /passphrase) to tailor custom passwords. 3 arguments(XXX), All binary(0/1)

        1. if_nums: Describes if password should have numbers or not. 0 means numbers are not allowed, 1 means numbers are allowed.

        2. if_specials: Describes if password should have special characters or not. 0 means special characters are not allowed, 1 means special characters are allowed.

        3. if_caps: Describes if password should have capital letters or not. 0 means capital letters are not allowed, 1 means capital letters are allowed.