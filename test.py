import requests

r = requests.post('http://localhost:8000/user/register',json={'name':'s','email':'r','password':'f','address':'d','aadhar':'fd','gender':'fdfd','mobile':'dfd'})
# print(r.json())
print('Done')