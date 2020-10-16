f1 = open('wordlist/wordlist_UK.txt')
data = f1.read().split('\n')
words_1 = []

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
        words_1.append(data[i])

print(words_1)