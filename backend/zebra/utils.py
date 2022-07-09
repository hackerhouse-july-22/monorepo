# import ethereum
# from ethereum.utils import ecrecover_to_pub, check_checksum

# import sha3


# # https://medium.com/@angellopozo/ethereum-signing-and-validating-13a2d7cb0ee3
# def signatureToVRS(signature):
#     r = int(signature[2:66], 16)
#     s = int(signature[66:130], 16)
#     v = int(signature[130:], 16)
#     return v, r, s

# # 161 signing method
# def hash_personal_message(msg):
#     padded = "\x19Ethereum Signed Message:\n" + str(len(msg)) + msg
#     return sha3.keccak_256(bytes(padded, 'utf8')).digest()


# def recoverAddress(msg, sig):
#     msghash = hash_personal_message(msg)
#     vrs = signatureToVRS(sig)
#     return '0x' + sha3.keccak_256(ecrecover_to_pub(msghash, *vrs)).hexdigest()[24:]

# def isValidEthereumAddress(address):
#     return check_checksum(address)