import json
import csv
name = "Milady #"
description = "Milady Sonaras sdfkldfjlk" #FILL IN
with open('stats.csv', newline='') as stats_csv:
    # read first line of file to get trait names
    reader = csv.DictReader(stats_csv)
    i = 00000
    for row in reader:
        with open("token" + i + ".json", 'w') as f:
            # include all trait types we want
            attributes = [
                {
                    "trait_type": "Drip", 
                    "value": row['drip']
                }, 
                {
                    "trait_type": "Eyes", 
                    "value": row['eyes']
                }, 
                {
                    "trait_type": "Mouth", 
                    "value": row['mouth']
                }, 
                {
                    "trait_type": "Face", 
                    "value": row['face']
                }, #ECT, ECT
            ]
            row['first_name'], row['last_name']
            #WRITE TO JSON SUCH THAT METADATA STANDARDS ARE FOLLOWED
            f.write(json.dumps("description": description, 
            # have each image call the proper token ID
            "image": "ipfs/sdakljskl/tokenID", 
            "name": name + i
            "attributes": attributes)
            print(row['first_name'], row['last_name'])
        i+= 1
    # save all these files then put them online and structure them in a way such that can be read using baseURI/{tokenID} (edited) 