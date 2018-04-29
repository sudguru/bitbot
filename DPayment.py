from bitshares import BitShares
import math

bitshares = BitShares()
bitshares.wallet.create("gurung1238")
bitshares.wallet.addPrivateKey("5JCGvuc7izx5VxNQPNUyVJfJodf4mdDdn3uuwvcrWqEEYdthLVY")

#jsonimport = [{"name":"airbud23","amount":0.2782689549146729},{"name":"oldtimer1","amount":0.18833890687746618},{"name":"holbein81","amount":0.152164548711757},{"name":"exyle84","amount":0.08846814261731668},{"name":"alice123","amount":0.07377870966060415},{"name":"bts-xiaoliang","amount":0.048536075613105016},{"name":"neked-art","amount":0.04261197178490976},{"name":"jogger2","amount":0.022116940219732123},{"name":"luoq5","amount":0.018579816453866346},{"name":"alown-a1","amount":0.017763945088439453},{"name":"investor123","amount":0.011058470109866061},{"name":"ellie-silk","amount":0.008330183637759695},{"name":"o0pepper0o","amount":0.00740606356246015},{"name":"cryptoassets-1","amount":0.004726075179728026},{"name":"madf00t","amount":0.004423388043946425},{"name":"crypto-grind1","amount":0.004016657513305551},{"name":"vglntrspwn","amount":0.003292157420669632},{"name":"l-i-k-n","amount":0.0028840450236038294},{"name":"marc-bousaleh","amount":0.002226852088122208},{"name":"investor1234","amount":0.002201524210521375},{"name":"dporn-elite","amount":0.00216243871142626},{"name":"may-weather","amount":0.0016191068805674503},{"name":"weberh8","amount":0.0015829447986305796},{"name":"browniedistro","amount":0.0013823092060720622},{"name":"steem-power-pics","amount":0.0011058474533254107},{"name":"jobin8738","amount":0.0008846776087892849},{"name":"supastix007","amount":0.0007643499531850279},{"name":"atmospheric-haze","amount":0.0006650634698282153},{"name":"kassy-kage","amount":0.0004556094108652861},{"name":"i-am-rodent","amount":0.0004472761901292955},{"name":"traderdad1","amount":0.00044233924673344686},{"name":"melissasweet1","amount":0.00044233924673344686},{"name":"alex9","amount":0.00044233880439464244},{"name":"swrdn","amount":0.00044233880439464244},{"name":"osu-bl0ws","amount":0.00044233880439464244},{"name":"manojm6573","amount":0.0004069521423818754},{"name":"t-34","amount":0.0003981049239551782},{"name":"historia-fitness","amount":0.00035387104351571394},{"name":"mandragora-1","amount":0.00031804160035974794},{"name":"mr-vulcan","amount":0.0002684801913601546},{"name":"ekavieka11","amount":0.0002344395663291605},{"name":"mr-viquez","amount":0.00022161174100171588},{"name":"taskmanager-holdings","amount":0.00019609985045825485},{"name":"iamiiwillbei2018","amount":0.00018872031218453904},{"name":"stcls","amount":0.0001813589098018034},{"name":"grand-slam","amount":0.00017693552175785697},{"name":"s-kay","amount":0.00017472382773588377},{"name":"enlitend1","amount":0.0001614536636040445},{"name":"ackza770","amount":0.00013867542687174238},{"name":"mary-sweet","amount":0.00011058470109866061}]
jsonimport = [{"name": "dev12345", "amount": .5}, {"name":"investor1234", "amount": .5}];
users = {}
failedList = {}

userPassword = input("What password did you use when setting up the wallet?")

totalSend = float(input("What is the total amount you are sending?"))

#bitshares.wallet.create("secret-passphrase")
#bitshares.wallet.addPrivateKey("<wif-key>")

bitshares.wallet.unlock(userPassword)

for items in jsonimport:
    seperate = items
    users[seperate["name"]] = seperate["amount"]

def coustomSend(people):
    keys = list(people.keys())
    for i in keys:
        try:
            amountToSend = round((people[i] * totalSend), 3)
            bitshares.transfer(i, round(people[i],3), "BTS", "", account="paydporn1")
        except:
            print("Failed: ", i, people[i])
            failedList[i] = round(people[i], 3)
    print("Failed List: ", failedList)

def printAmountToSend():
    keys = list(users.keys())
    for i in keys:
        amountToSend = amountToSend = round((users[i] * totalSend), 3)
        person = i
        print(person + ":" + str(amountToSend))
