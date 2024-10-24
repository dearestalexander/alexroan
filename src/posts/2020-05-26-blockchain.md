---
title: Blockchain - how it works
author: Alex Roan
date: 2020-05-26
tags: ["post", "article", "technology"]
image: /assets/images/blog/blockchain__cover.jpg
imageAlt: 
description: Blockchain has been one of the most hyped technologies of the last decade thanks to the massive profits that were made from bitcoin and other cryptocurrencies. Despite a lot of of the smoke and mirrors that surrounds blockchain it is a fascinating technology.
---

Blockchain has been one of the most hyped technologies of the last decade thanks to the massive profits that were made from bitcoin and other cryptocurrencies. Despite a lot of of the smoke and mirrors that surrounds blockchain it is a fascinating technology.

This post is based on a presentation I gave to my fellow international coleagues in Japan in 2019. I was motivated to create and deliver this presentation to combat a lot of the misinformation around blockchain solutions and when they should and shouldn’t be considered. To understand the benefits and use cases for blockchain it’s useful to understand how it works.

This requires a brief walk through of various concepts including mathematics and cryptography which have a big role in making blockchain possible. Bear with me as we work through some of the concepts it will hopefully all make sense by the end of the post.

## The big idea

### A decentralised ledger

Blockchain can be considered simply as a ledger, what makes it unique is it’s decentralised nature. Blockchain has various key properites:

- It’s a ledger records transactions between parties, but as we will see we can track anything – more than a traditional ledger.
- Transactions are verified using cryptography
- Data is decentralized; transactions are stored and verified across all computers in the network (nodes)
- Therefore no need for an intermediary (e.g. bank / data centre / government body)
- Transparent – data is public; anyone can view transaction history
- Immutable – unchangeable
- Partial privacy / anonymity – while data is public it is not connected to real IDs.

Don’t worry if these don’t make sense now, we will cover them during this discussion.

### A traditional ledger - bank account example

A bank account is a simple example of a ledger. However a ledger can be any book of record; shipments, patient records, insurance policies etc. Consider the properties of a traditional bank acocunt:

- Account holder has no direct control
- Central authorities have power over the account (the bank; government etc.)
- Data is stored centrally; vulnerability to hardware failure or attack
- Privacy is limited; all transactions require proof of ID / address

![An illustration of how a user accesses money from a bank](/assets/images/blog/blockchain__one.png)

### Decentralisation

As with the bank account example a 3rd party acts as a central authority to control and manage the account. What if it was possible to keep a book of record without relying on a central authority, this would provid the following:

- Architectural independence (no reliance on a single physical server)
- Political independence (no single point of control from any organisation)
- Logical independence (data is duplicated across many physical machines).

The potential benefits of these include:

- Less susceptible to attack
- Less susceptible to failure
- Improved privacy / anonymity (partial)
- Improved transparency (records are publically traceable and unchangeable)
- Not susceptible to control by a single authority.

## Blockchain origins

In 1991 a paper entitled “How to Time-Stamp a Digital Document” presented a major landmark in cryptography and provided the concept which would allow us to send and receive documents across a public internet with trust. This provided the foundation for blockchain.

![A screenshot of the 'how to time-stamp a digital document' paper](/assets/images/blog/blockchain__two.png)

In 2001 Satoshi Nakamoto published a paper entitled, “Bitcoin: A Peer to Peer Electronic Cash System” which outlined how blockchain works. Satoshi Nakamoto is the name used by the person or group of people who developed bitcoin, but this is not a real person.

![A screenshot of the 'bitcoin' paper](/assets/images/blog/blockchain__three.png)

You could read through these two papers and peice together everything we will talk about here, however it does get rather technical and I’ve included a number of diagrams in this post that I hope will make the concepts easy to grasp.

### A brief history of blockchain

- 1991 Stuart Haber and W. Scott Stornetta – 1st paper outlining the use of cryptographically secured blocks to preserve integrity of past information
- 1993 Proof of work concept established as a countermeasure to spam / network abuse
- 2008 Satoshi Nakamoto published famous white paper “Bitcoin: A peer-to-peer electronic cash system”
- 2014 Ethereum – a blockchain that can be programmed and can run computation – world computer “Ethereum virtual machine”
- 2015 Bitcoin gets serious attention
- 2016 Bitcoin embraced by FSI
- 2017 Blockchain named foundational technology in HBR

### No need for a trusted party

One of the most noteworthy benefits of blockchain is that no central authority is required.

![An illustration of how bitcoin doesn't rely on traditional banks](/assets/images/blog/blockchain__four.png)

This means blockchain can be used for an electronic currency; as is the case with bitcoin, without any involvement from banks, central banks, or governments etc.

### Cryptocurrencies market

Blockchain has multiple applications, cryptocurrencies being the original and one of the most popular use cases. For context the cryptocurrnecy market currently stands at around US $250,000,000,000. May 2020 data from [coinmarketcap.com](http://coinmarketcap.com/):

- Cryptocurrencies: 5,500
- Markets: 22,416
- Market Cap: $255,219,845,520

![A screenshot of a web page showing data on the size of the cryptocurrency market](/assets/images/blog/blockchain__five.png)

## Cryptography as an enabler of blockchain

To understand the concept of blockchain and some of the terminology involved we need to understand some number formats used in mathematics and technology.

### A 256 bit number

![An illustration of the size of a 256 bit number in base, binary and hex](/assets/images/blog/blockchain__six.png)

What do the three sets of digits above have in common?

They all represent the same number, but in three different formats.

We normally count in decimal; also known as base 10. This simply refers to counting with 10 digits; 0,1,2,3,4,5,6,7,8,9. There are two other ways of counting that are important. Binary which uses 2 digits 0 and 1. And Hexadecimal which uses 16 digits; 0-9 and A-F. Binary is used by computers and hexadecimal is commonly used as a short form to record long numbers.

A 256 bit number is simply a number that when written in binary has 256 digits. These numbers are commonly used in cryptography and blockchain as they are hard to guess.

How hard is a 256 bit number to guess?

- They have 2256 possible combinations
- 116,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000 combinations

Because long numbers of this nature are very hard to guess they play a critical role in cryptography, unlike a 10 digit password they can’t easily be brute force guessed by computers (i.e. trying all combinations).

### Basics of cryptography – can you de-crypt this?

In cryptography we apply a rule known as a cipher to a message (sometimes called plain text) to create a cipher text. For example:

![An illustration showing an original message and a cipher based on it](/assets/images/blog/blockchain__seven.png)

A cipher was applied to a message to create the text Mjqqt, Btwqi! – can you figure out what the original message was.

In this case it’s quite simple to break. The cipher is a simple and fairly easy rule. It’s known as a Caesar Sipher; it was first used by the Roman Empire, and simply involves shifting the digits a number of spaces up or down the alphabet.

![An illustration showing an original message and a cipher based on it with additional annotation of the cipher used](/assets/images/blog/blockchain__eight.png)

In this case we moved each digit 5 characters down the alphabet. This is also known as a map function.

### About functions

- A function takes an input and produces and output f(x) = y
- An input is part of a whole (domain) e.g. integers, prime numbers
- A function where N inputs produces N outputs is a map function e.g. f(1,2,3,4) = (1, 4, 9, 16)
- A function where N inputs produces 1 output is a reduce function e.g. f(1,2,3,4) = 10
- An example of a famous function is e = mc2

There are two key ‘cryptographic’ functions that enable blockchain, these are:

- Hashing functions
- Elliptic curve digital signature functions.

For general purposes the term algorithm can be considered synonymous with function, however in certain areas of maths and computer science the term may be used with slightly different meanings.

### Hashing functions

A hashing algorithm creates a short ‘fingerprint number’ which can represent an arbitrary large amount of information.

- Use a ‘hash’ function to product an output
- Examples are SHA256, MD5, Bcrypt, RIPEMD
- A hash takes an input of any size (e.g. from one word to the entire works of shakespeare)
- Produces an output of a fixed size (referred to as a digest)
- Computational efficiency: for a given input the output should be easy to compute
- Deterministic: for a given input, must always give the same output
- Pre-image resistant: the output must not reveal anything about the input
- It has to be practically impossible to reverse engineer to derive an input (one-way function)
- Collision resistant: it must be practically impossible to find two different inputs that produce the same output.

To provide an illustration of how a hashing function works, it does something like the following:

- Convert english letters (e.g ASCII) into 1s and 0s
- Move the first four bits from left to right
- Separate every other bit
- Convert those two parts into base 10 numbers
- Multiply the two numbers together
- Square that number
- Convert the numbers back to binary
- Chop 9 bits of the right side to get exactly 16 bits
- Convert the binary numbers back to english letters.

There are online tools that will convert any data into a hash. Here are three examples of some short, simple text fed into a SHA256 hash function:

![An illustration of different messages and their correponding hash values](/assets/images/blog/blockchain__nine.png)

- No matter the size of the input, the output will always be 256 bit
- Even minor changes to the input “Alexander” > “AleXAndeR” will dramatically and unpredictably change the output.

### Elliptic curve digital signature functions

Elliptic curve functions are used for digital signatures, these are used to:

- Validate the sender of an electronic message
- Ensure the message wasn’t tampered with

The mathematics is complex, so we will skip the mathematics on how the required numbers (known as “key pair”) are generated, but will look at how the process works in detail.

A good starting point for more detail is wikipedia:

- [Digital signature algorithm](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm)
- [Elliptic curve digital signature algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)

## Digital signatures

### Public and private key cryptography

We can use the elliptic curve function to create two connected numbers which are known as public private key pairs and are used in cryptography.

![An illustration of a user having a secret key and a public key](/assets/images/blog/blockchain__ten.png)!

- A key is used to encrypt and decrypt data
- Symmetric cryptography: the same key encrypts / decrypts
- Asymmetric cryptography: a different key encrypts / decrypts
- Key-pairs are generated using the elliptic curve function
- A key-pair is a private (aka secret key) and a public key
- A public key is announced and known to the world
- A private key is kept secret
- It’s hard (practically impossible) to know someone’s private key if you know their public key
- Order is not important, private key to encrypt and public to decrypt, or public to encrypt and private to decrypt.

### Encryption for confidentiality

The following diagram shows how one party can encrypt a document, then send it across a public network, where it can be decrypted by another party. In this diagram pk represents a persons public key while sk represents their private / secret key. Each person has their own key pair that they will generate, they will only share or publish their public keys.

![An illustration of the a cryptography matching the description below](/assets/images/blog/blockchain__eleven.png)

- Party A has some sensitive data they want to send to party B (they want to ensure no one other than party B can see the data)
- Party A has access to party Bs public key (everyone does)
- Party A uses a cryptography function along with party Bs public key to convert the data to encrypted data
- Party A publishes this encrypted data on the public internet or sends it to party B via e-mail etc.
- This encrypted data can now only be unencrypted by party Bs private (secret) key.
- Remember party B keeps their private (secret) key a secret, no one else has access to it.
- Party B uses a cryprography function along with their private (secret) key to unencrypt the data.

This is a simple example of the basics of cryptography that allow us to send secure data across the internet.

However there are some problems with this data. How does party B know that the encrypted data they received came from party A? How do they know it wasn’t intercepted and modified.

This is where we need to take things further and look at a more complicated and complete example of the use of digital signatures.

### Encryption using digital signatures

Step 1: Party A encrypts data with their private key

![An illustration of the above point](/assets/images/blog/blockchain__twelve.png)

Step 2: Party A combines the original data with the ‘Party A private key’ encrypted data and then encrypts this package with party Bs public key.

![An illustration of the above point](/assets/images/blog/blockchain__thirteen.png)

Step 3: The package of encrypted data is sent over the public network.

![An illustration of the above point](/assets/images/blog/blockchain__fourteen.png)

Step 4: Decrypt the package of encrypted data with the party Bs private key to reveal the data and the ‘party A private key’ encrypted data

![An illustration of the above point](/assets/images/blog/blockchain__fifteen.png)

Step 5: Decrypt the ‘party A private key’ encrypted data with party As public key and then compare this data with the other data file, if they match you can trust that the encrypted data you received was sent by party A and was not tampered with or changed.

![An illustration of the above point](/assets/images/blog/blockchain__sixteen.png)

This is a little difficult to follow, it’s worth reading through a few times, it’s quite straightforward once you get used to working with key-pairs.

### Generating a key-pair

- Choose a random 256 bit number as a private key
- Use the elliptic curve function to generate the private – public key pairs
- Key pairs form the basis of bitcoin addresses

A fun way to geneate a 256-bit number is to use bit-address.org which will generate a key-pair that can be used for bitcoin.

With bitcoin your public key is your bitcoin address.

It’s critical to keep your private key secret as this will allow complete access to any bitcoin you own or in another blockchain any encrypted data etc.

![A screenshot of the bit-address.org website](/assets/images/blog/blockchain__seventeen.png)

![A screenshot of a generated addresses from bit-address.org ](/assets/images/blog/blockchain__eighteen.png)

Digital signatures:

- More secure than physical signatures
- Change with every message – altering messages even slightly completely changes the signature
- It’s infeasible to find a valid signature if you don’t know the secret key. Therefore they cannot be forged.

## Building a decentralised ledger

Consider a ledger to track transactions between 4 parties:

![An illustration of transactions between 4 parties with a table of example transactions with values](/assets/images/blog/blockchain__nineteen.png)

To manage this without a central authority there are a number of requirements:

- We need to allow everyone to add transactions
- We need to make sure periodic settlement is done
- We need to decide where the data is stored and how everyone agrees on ‘the truth’

### Developing a blockchain protocol

The original bitcoin paper looked at each challenge and proposed a solution

![An illustration of three challenges for developing a blockchain protocal which are described in the following section](/assets/images/blog/blockchain__twenty.png)

### Challenge 1 - transaction trust

What stops party B adding a transaction saying that party A owes them $20?

![An illustration showing party A sends to party B](/assets/images/blog/blockchain__twentyone.png)

![An illustration expanding on the above to show the value sent from party A to party B is £20](/assets/images/blog/blockchain__twentytwo.png)

Traditionally we trade with cash on delivery or use payment systems with some inbuilt protection e.g. credit cards or paypal.

This is where digital signatures can help:

- A digital signature can be used to prove that the transaction is verified
- Party A adds a digital signature to transactions in the ledger which validate they have seen them and agree with them
- These signature must be infeasible to forge. This is where cryptography makes blockchain possible.

![An illustration of a digital signature on the example transaction](/assets/images/blog/blockchain__twentythree.png)

We can now update the first challenge in our blockchain protocol:

![An illustration updating challenge 1 as resolvable with digital signatures](/assets/images/blog/blockchain__twentyfour.png)

### Challenge 2 - ensuring settlement

What if party A racks up debt and refuses to settle?

![An illustration of various transactions between parties](/assets/images/blog/blockchain__twentyfive.png)

Instead of solving the problem of making the parties settle, the blockchain paper raises the questions, “What if we can remove the need to settle”?This can be done by preventing people from spending more than they take in.

Step 1: Start by giving all participants an opening balance

![An update to the above illustration to add initial balances for each oarty](/assets/images/blog/blockchain__twentysix.png)

Step 2: Only allow transactions where no overspending occurs

![An update to the above to show how a transaction could be invalid](/assets/images/blog/blockchain__twentyseven.png)

We can update our blockchain protocol for the second challenge:

![An illustration of how the second challenge can be resolved by not allowing overspending](/assets/images/blog/blockchain__twentyeight.png)

An interesting note is that blockchain does not keep a running balance, each new transaction checks the complete bitcoin history.

### Challenge 3 - storage and management

Without a central authority how do we manage the ledger:

- Who hosts the storage
- Who controls the rules of adding new transactions
- etc.

Let everyone keep their own copy of the ledger, whenever someone has a new transaction they broadcast it out to the network.

![An illustration of a new transaction going to multiple ledger copies](/assets/images/blog/blockchain__twentynine.png)

How can you be sure that each ledger picks up every transaction that is broadcast out and in the right order?

We can update the blockchain protocol:

![An update to the challenges to show challenge three can be resolved by multiple copies](/assets/images/blog/blockchain__thirty.png)

The final challenge we will cover deals with how the network stays aligned. For this we need to deep dive into the structure of blocks and look at how the chain is managed.

## Blocks and the blockchain

### Blockchain and proof of work

How do we ensure the network stays aligned?

Transactions are bundled into blocks. And those blocks are validated in a way that allows the network to reach consensus.

The method bitcoin uses to validate blocks is known as ‘proof of work’. This is made possible because of the foundational concepts discussed thus far:

- Cryptography
- Hash functions
- (and computational work)

### How blocks are created

In the diagram I’ve included a screenshot of the bitcoin wallet mycellium as an example of how a user might interact with a blockchain. Using mycellium a user may create a transaction; a request to send bitcoing from their address to another address. This transaction then enters the ‘mempool’ which can be considered as a waiting room for the transaction to be added to the blockchain. Miners pick transactions from the mempool and create ‘blocks’ of transactions which they then compete with other miners to validate and add to the chain.

![An illustration as described in the above text](/assets/images/blog/blockchain__thirtyone.png)

### Anatomy of a block

Using a slightly simplified block design for the purposes of illustration we can consider a block to be something like the below.

1. Sequential ID: to ensure the same transaction / block cannot be copied
2. Nonce (number used only once): a number the miner can vary to validate the block
3. Data / message: the transactions in the block – normally hundreds or thousands, only a few shown for illustration purposes.
4. Previous block hash
5. Hash signature of the current block

![A simplified illustration of a block](/assets/images/blog/blockchain__thirtytwo.png)

### Many miners build blocks in parallel

Miners are constantly picking up transactions from the mempool and competing to make a block. This is all part of a system to ensure that blocks are created with a certainy frequency and that the network will agree on the order of the blocks and hence the transactions that are contained within.

![An illustration showing how multiple blocks are being picked up by miners](/assets/images/blog/blockchain__thirtythree.png)

By competing to make a block we refer to a competition that miners are taking part in. Understanding this competition is key to understanding how blockchain works and where it’s weaknesses lie. This competition is called proof of work.

### Proof of work

Proof of work involves using a cryptographic hash function to encode the data contained in the block into a hash.

The format of the hash is unpredictable.

So blockchain set’s a competition for miners to find a hash with a certain number of preceding zeros. This is known as a difficulty threshold.

The only way to do this is by changing the nonce. The timestamp will also change as time progresses. The miner will keep generating a hash with this info. until eventually one miner finds a hash that wins.

Recall that the data we put into a hash function changes the hash output. Therefore changing the nonce or timestamp provides an opportunity to hash the same block of transactions over and over and generate different hash outputs.

If we take a look recent blockchain blocks; which we can do via a number of online explorers:

![A screenshot from a blockchain explorer showing block details for one block](/assets/images/blog/blockchain__thirtyfour.png)

We can see that the winning block hash start with a certain number of leading zeros; currently 19 for blockchain.

### Proof of work - step by step

- Miners hash the block data using a hashing function e.g. SHA256
- It is likely the results of hash will not have a number of leading zeros.

![An illustration of how a block is encrypted](/assets/images/blog/blockchain__thirtyfive.png)

- The miners adjust the Nonce
- The timestamp may also change
- They will continue to run this until a hash is generated with the desired number of leading zeros.

![An illustration of the hash value with leading zeros](/assets/images/blog/blockchain__thirtysix.png)

- The hash results of SHA256 in hexadecimal has 1664 possible combinations
- (each digit has 16 possible combinations 0-F and there are 64 digits)
- To be valid a hash has to meet a certain threshold of difficulty set by the network
- As of 25th May 2020 the latest winning block hash for blockchain was:
- 0000000000000000000bea250e982735d2d6a92bf9b21ec222e1394c4c0746f4
- This block has 19 leading zeros – the difficulty current difficulty threshold
- This block contained 2598 transactions
- The probability of SHA256 returning a hash with 19 leading zeros is extremely low
- Who ever finds a valid block is rewarded with bitcoin, the above noted winning block won 6.25 bitcoin.
– The goal of the difficulty threshold is to control how quickly blocks are added to the chain; and hence how quickly transactions are processed
- Miners are working on different blocks at the same time, if a block is not validated the transactions will remain in the mempool to be processed
- Miners also get transaction fees which incentivise miners to pick certain transactions from the mempool
- Blocks in bitcoin are limited to around 2500 transactions
- For comparison, VISA processes around 1700 transactions per second, but is capable to handle much higher levels, so blockchain is relatively slow compared to other payment systems.

### Block demo

As we talk through this section, please expirement with the excellent online demo available on [andersbrownworth.com](https://andersbrownworth.com/blockchain/hash)

- You can experiment with creating blocks using the ‘block’ menu item
- You can view how the chain builds up and how changing blocks affects the chain

![A screenshot of the above mentioned block demo tool](/assets/images/blog/blockchain__thirtyseven.png)

### How blocks are connected

After a block is validated via proof of work, the hash of that block is then used as part of the construction of the next block

This means that any change to any previously validated block will make all blocks since then invalid.

![An illustration showing how each block is connected to the previous block](/assets/images/blog/blockchain__thirtyeight.png)

### The synchronisation challenge

- The blockchain is decentralized
- The complete chain exists on every participating node
- Nodes are spread all over the world
- In the short term nodes will not be aligned due to: computer processing speeds, network speed, isolated downtime and failures etc.

The protocol deals with this by always trusting the longest chain:

- With bitcoin, around 6 blocks back is considered to be trusted
- With 1 block per 10 mins this means blocks created around an hour ago are trusted
- Blocks which are not accepted as part of this longest chain have their transactions returned to the mempool to be processed as part of future blocks

Consider 3 nodes participating in a blockchain network at a given moment. The recent blocks may be different, but as node c is the longest it will be trusted and node a and b will eventually synchronise with node c.

![An illustration showing how recent blocks may vary across different nodes](/assets/images/blog/blockchain__thirtynine.png)

## 55% attacks

One of the commonly talked about weaknesses of public blockchains is the 51% attack. This is based on the computational feasibility to have a node or set of nodes that can validate new blocks on the network faster than anyone else for an extended period of time; there is no longer true consensus across the distributed network and a single party has taken control.

![An illustration of a 55% attack as described](/assets/images/blog/blockchain__fourty.png)

Recall that each transaction that enters the mempool is verified by digital signatures.

This means an attack cannot add false transactions.

However there is a way to fraudulently attack the network called the ‘double spend’ attack.

To execute the double spend attack, the attacker must be able to validate blocks faster than the rest of the network hence > 51% of computational power is needed. The first step is to take the latest block offline.

Step 1: The attacker takes the latest block offline

![An illustration showing an offline copy](/assets/images/blog/blockchain__fourtyone.png)

Step 2: The attacker mines faster than the network and
Step 3: Spends their cryptocurrency on the main network.

![An illustration of step 3](/assets/images/blog/blockchain__fourtytwo.png)

Step 4: The attacker goes online, as they have the longer chain the rest of the network will trust it and
Step 5: They can then double spend.

![An illustration of step 5](/assets/images/blog/blockchain__fourtythree.png)

Step 6: Eventually the attacker will cease the attack, but will have by then double spent their funds.

![An illustration of step 6](/assets/images/blog/blockchain__fourtyfour.png)

## Public, private and consortium blockchains

### Public

Bitcoin is a public blockchain is where the technology shines. The network is open for anyone to use, there is not central authority and proof of work is used to validate blocks.

- Zero trust
- Anyone can take part
- Must adhere to protocol
- Maintains protocol specification and decentralization via consensus algorithms such as proof of work
- Allows entities that don’t trust one another to collaborate
- Issues exist with privacy and scalability
- Large number of participants protects the network; the higher the number the better.

### Private (permissioned)

As people have tried to take advantage of blockchain they have developed so called private blockchains. The idea is that many organisations see some benefit to blockchain, but they don’t want it to be truly public. They want control of who can enter transactions and who can validate transactions / blocks.

- High trust
- Block creation power granted to set number of participants
- Could have a single entity responsible for syncing the entire network (proof of authority)
– A business can have full control
- Removes need to incentivize individuals to create blocks
- Alleviates transparency concerns
- Better scalability and transaction throughput
- Attacks would come from nodes known to the network & users can be blacklisted
- Just a database but with cryptography, immutability and transparency benefits.

### Consortium

- Low trust
- Consensus mechanism controlled by a limited number of nodes
- Right of access can be limited to the predetermined nodes or made public
- Partially decentralized
- Could be set up in such a way that all nodes have to sign transactions
- Power isn’t centralized to one party.

### Alternatives to proof of work

Proof of work presents some issues. On the one hand it’s extremely processing intensive and has received criticism from an environmental perspective. On the other hand not every organisation is comfortable with an open model where anyone has authority to verify blocks based on processing power. Alternatives are always under investigation, some examples include:

Proof of work

- Computationally intensive
- 51% attacks exist as a risk
- Incentivisation costs are need for transactions
- Reliance on a high number of nodes / high participation

Proof of stake

- Ability to create new nodes is based on proportion of currency held
- Solves computational issue
- Can lead to hoarding

Proof of authority

- One or more nodes are certified as authorised to create new blocks
- Essentially reduces blockchain to a something more similar to a traditional database from a centralization perspective.

## Other topics

### Cryptocurrency vs. token

Cryptocurrencies have been around since bitcoin. More recently ‘tokens’ have become a popular topic.

- A mechanism to represent a physical item / value in a digital way
- Could be considered as a share in a company rather than a currency unit
- Ethereum works by using the token called ‘Ether’
- Can be created arbitrarily on a network (e.g. create a project and sell to fundraise)
- Governed in a similar way to coins
- ICO – initial coin offering; crypto version of IPO, these are not well regulated.

### Ethereum smart contracts

- Ethereum supports smart contracts
- Ethereum has the ability to store and execute code on the blockchain
- This code; written in assembly / solidity (similar to javascript), can allow you to create, “IF.. AND.. THEN” type of executable version of a traditional contract
- For example: IF a deposit is paid AND property checks are confirmed AND funds + deeds are made available THEN transfer money and ownership deeds between parties.
- The code is executed by the Ethereum virtual machine (EVM)
- The EVM runs on every node, so it works as a distributed computer
- Processing isn’t free, it’s pay per computation (with Ether)

Advantages

- Blockchain is immutable so once the contract is created, it cannot be changed
- No central party is required to hold / execute the contract
- Contracts can engage with other contracts so complex chains of business events can be handled
- As EVM is distributed it’s highly reliable

Disadvantages

- If there is an error in a contract it’s very difficult to fix
- Processing time is slow
- Due to the distributed nature of EVM every computer on a network has to process
- Storage of data / information and processing fees are expensive
- Not widely proven with scaled live examples
- While blockchain itself is immutable and transparent the triggers or rules for the contract can easily be manipulated potentially defeating the benefit of using blockchain.

### dApps

- Higher level apps that use smart contracts
- i.e. connecting together more advanced logic across one or more contract
- Web or mobile app front end, digital connecter for blockchain, then decentralized networks (EVM)

Advantages

- Robust to attack
- High fault tolerance
- Access to value, tokens, currency
- Easy payment processing
- User verification simplified
- Self-sovereign data management
- User data more protected
- Higher trust with public trust

Disadvantages

- Running code is expensive
- Storage on the blockchain is expensive
- Every node runs every process
- Must wait for transactions
- Smart contracts are permanent
- Scaling is a concern (speed of the slowest computer)

## Final thoughts

There are a number of questions to ask when considering blockchain as a solution. From my perspective if we are considering a truly public application where we have solid requirements such as:

- We don’t want any party to have sole authority
- We want an immutable record (unchanegable)

Then blockchain makes sense.

For other cases where we are considering a non public network where we might restrict who can add transactions and how blocks are verified then it might be better to consider traditional database. Keep in mind blockchain comes with a number of disadvantages:

- It’s slow (for various architectural reasons)
- It’s difficult / impossible to resolve any errors with historic transactions
- It’s not computationally efficient.

Questions to consider:

- Do I need a database – if so what architcture is optimum?
- Are there multiple writers?
- What level of trust exists between writers?
- Can I / do I want to rely on a trusted party?
- Do I want to limit access or validation control?
- What’s more important immutability or efficiency?
- Do I need to make it public?

While we considered the concepts of blockchain and the history up to early 2019, recent advancements and use cases are not discussed here. What are your thoughts on blockchain in 2020?

## References

I found the following resources extremely helpful when first using blockchain. You will find the inspiration for some of my diagrams here:

- [But how does bitcoin actually work](https://www.youtube.com/watch?v=tY72NO1LsZU)
- [Blockchain demo](https://andersbrownworth.com/blockchain/)
- [How bitcoin works under the hood](https://www.youtube.com/watch?v=Lx9zgZCMqXE)
