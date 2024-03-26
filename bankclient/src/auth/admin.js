import admin from 'firebase-admin';



const type = "service_account";
const project_id = "bankcapstone-cbec0";
const private_key_id = "4e5013595baf72a0da875027539abadcb81c8f6b";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYOZnyidsmHnWP\ndtEGMpP+oPai3hB23VhZq+bf2dtdhGmqCiuOVqmlRvWD+C+tI7EeNBCQaGi/+L6E\nas80HxofTBLi3ZVL4kmgtTzknf7XvGG+Ejl0kYprQC5MQum1K5Y9Rf01i4CqU+Eh\ny8CSQNmWiFlxk4apoYd8Nv4WiGmPOqVxjzeJuz8CvcoKoo0aIfufXLGIWNAqyYX4\nb104zleeV9CGj+yqGy2FDNzBsmZbgm0bAxVgP+0qU0e/rwf62WVd/y0CMnZOBuJI\nmafM/tl4YG0IhROD02nkEs9EyCyZmBqaAkW8e4WYnffohWsxjxzLFR0HPeM29+1p\nKctMvr8NAgMBAAECggEAMxPsV3yUTd1tJP5K411oU4K/sHqnxgSEve4bRG8I4H8K\nnPX5Ew9K1PW9wraKwKpJSVrAPPTFJfBDRTGcD/J278S/Q2NXxMzIWtPldhYSoPDp\n4AYbF3vYCHzpUu+NmNQakg/qAE+bjeDxslOZApOaMvKzul5AteqoAEJXZIhF82TW\ned7G8iVZ2hiO/+Z9nU5cKHByj5E40+ZN/xE/EiwkvtlgGWRN19GU7QZqHT2q99vH\nGzM3KCo6bdaFKlverfFVzg0Lu7eTM5dnEADQvM6pIKXTWf6jo2aizvWYB2cYKT+C\nvGXzizP9ig6rkviOOlb/om3nz6OnMsJ1VpbvB5qvIQKBgQD0jTKlMhmQo83FzAg5\nVMZIvM/9StZ5z01ZdN7MY/MF5JsV2ZNrMQcillXFJYIJ9mKeVAyw2XTJUp6KeZ+C\nH9kK09nBZADSBoZOj6oCCJrCHC93yBz+CEIZaZ7i9eJuHL3dDBQh0Obekq99rp/W\nQuur5Zz7uDxfdNe1OfMqK/cSfQKBgQDiWO1QKKX0qEznvMWLIMsvJaRkRcfY+vzh\n7Dl19kfJoJFQrSldGa0FLR2trcUny0MhAI0zv2oKM+C1SfIry8WIEJOznnhNAi6j\nqAFi87Onls/I9pczXt+VW130k4CxPr2u6uRLTl2IzZckHx+DCsdbebAVYJNr7F03\n+hh/xCzz0QKBgQCnC2PSz3wC/sDqIUpkzvF6ce6ol9wU7HNrbZdaidNQ7Sy6Khq2\nl5DGIWaI+evvnisS91qL2p4ZfqPo9tbr7ZE2Aiu2G/crf2VyeFOqe/IqMVKDQV/8\nbeuorCrp4QdAK8XNHhkKWEW7NvtEoGlx09hjXL50ew5SLd/CXMkqv0lPiQKBgBI9\nOjpIXD8fxLqzwnNYnCbbcKjH2rfIWdJWt7aittwvfSY0He4roH6XSRnys71mKq2h\nHr+5v/C8h3H0WHhg/jTdqRlDPsxtzZZQdnQj0SlDBNFb1YlFLt0ZNLP9otQliyFq\nOiU7VlwsvO4jN+XWW4QqhR7j3l1G+agGFi1NgJXRAoGATffZVIVP99B3RBPMNFpa\nwhKmGlYpJ5keHhsgIsUtdfB399XK8rla/y5sD2Q0uA9mXF7j3d5IVHy4AUSmBxdN\nlHMRw9GvLqa+iJqZEfiEmEJdNO5M4/OSU5t/Q6kTpBfofhA+ygx80Ay8nfQfJZCC\n76w6yGPHIA/CSMP6f5hmD5o=\n-----END PRIVATE KEY-----\n";
const client_email =  "firebase-adminsdk-3nk0o@bankcapstone-cbec0.iam.gserviceaccount.com";
const client_id = "104098014573891355869";
const auth_uri =  "https://accounts.google.com/o/oauth2/auth";
const token_uri = "https://oauth2.googleapis.com/token";
const auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
const client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3nk0o%40bankcapstone-cbec0.iam.gserviceaccount.com";
const universe_domain = "googleapis.com";

const fbApp = admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key:
      private_key.replace(/\\n/g,'\n'),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
    universe_domain
  })
})

export default fbApp