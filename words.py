fnames = ['wordlist/wordlist_UK.txt', 'wordlist/wordlist_US.txt']

def word_lists(fname):
    f1 = open(fname)
    data = f1.read().split('\n')
    words = []

    for i in range(len(data)):

        acceptable  = True

        # dont accept words less than four letters long
        if(len(data[i]) < 4):
            acceptable = False

        # dont accept words with any punctuation or capitals
        for j in range(len(data[i])):
            if (data[i][j] <='a' or data[i][j]>='z'):
                acceptable = False  

        # dont accept similar words(same word but with ing, 's etc. EX: york and york's)
        if('ing' in data[i][-3:]):
            acceptable = False
        if('est' in data[i][-3:]):
            acceptable = False
            
        if(i>0 and data[i][:-1] == data[i-1] and data[i][-1] == 's'):
            acceptable = False
            
        if(acceptable):
            words.append(data[i])
    
    return set(words)

all_words = set([])
for i in fnames:
    all_words.update(word_lists(i))

print(list(all_words))