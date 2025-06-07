# GoodayeMate - Australian Chatbot

GoodayeMate is a chatbot application with a strong Australian personality. It uses OpenAI's GPT-3.5 to generate conversational responses and converts them to audio using Google Text-to-Speech (gTTS). The backend is built with FastAPI, and the frontend is built with Angular. There are instructures for running with Docker and deploying with
Kubernetes.

The pupose of this app was to create a basic AI chatbot and teach myself how to create
a docker image and deploy to a k8s cluster. Enjoy!

## Features
- Chat with an AI assistant named "Bruce" who speaks in Australian slang and vernacular.
- Converts text responses to audio for playback.
- Easy-to-setup backend and frontend.

---

## Prerequisites
Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js and npm (for the frontend)
- Git

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/GoodayeMate.git
cd GoodayeMate
```

### 2. Backend Setup
Navigate to the Backend Directory
```bash
cd backend
```

Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install Dependencies
```bash
pip install -r requirements.txt
```

Set Up Environment Variables
Create a .env file in the backend directory and add your OpenAI API key

OPENAI_API_KEY=your_openai_api_key


GitHub Copilot
Here’s a README.md file for your project to help others set it up and use it locally:

2. Backend Setup
Navigate to the Backend Directory
Create a Virtual Environment
Install Dependencies
Set Up Environment Variables
Create a .env file in the backend directory and add your OpenAI API key:

Run the Backend
```bash
uvicorn main:app --reload
```

The backend will be available at http://127.0.0.1:8000.


### 3. Frontend Setup
Navigate to the Frontend Directory
```bash
cd ../australian-chatbot-frontend
```

Install Dependencies
```bash
npm install
```

Build the Angular app for production
```bash
npm run build --prod
```

Run the Frontend
```bash
ng serve
```

The frontend will be available at http://localhost:4200

### Usage
Open the frontend in your browser at http://localhost:4200.
Start chatting with Bruce, your Australian AI assistant.
Listen to Bruce's responses via the embedded audio player.


### Running with Docker

#### Backend
1. Pull the backend image:
```bash
   docker pull jamielabed/goodayemate-backend:latest
```

2. Run the backend container
```bash
docker run -p 8000:8000 -e OPENAI_API_KEY=<your_openai_api_key> jamielabed/goodayemate-backend:latest
```
NOTE: REPLACE <your_openai_api_key> WITH YOUR API KEY


#### Frontend
1. Pull the frontend image:
```bash
docker pull jamielabed/goodayemate-frontend:latest
```

2. Run the frontend container:
```bash
docker run -p 4200:80 jamielabed/goodayemate-frontend:latest
```

Access the application:
Backend: http://localhost:8000
Frontend: http://localhost:4200



---



### Deploying with Kubernetes

#### Prerequisites
- Kubernetes cluster (e.g., Docker Desktop Kubernetes, Minikube, or a cloud provider like AWS EKS).
- `kubectl` installed and configured.

#### Steps
1. Create the OpenAI API key secret:
```bash
kubectl create secret generic openai-api-key --from-literal=api-key=<your_openai_api_key>
   ```
NOTE: REPLACE <your_openai_api_key> WITH YOUR API KEY

2. Apply the backend deployment:
```bash
kubectl apply -f backend/backend-deployment.yaml
```

3. Apply the frontend deployment:
```bash
kubectl apply -f australian-chatbot-frontend/frontend-deployment.yaml
```

4. Verify the pods are running:
```bash
kubectl get pods
```

5. Access the application:
    - Backend: Use kubectl port-forward:
```bash
    kubectl port-forward service/goodayemate-backend 8000:8000
```
    Access at http://localhost:8000

    - Frontend: Use kubectl port-forward:
```bash
    kubectl port-forward service/goodayemate-frontend 4200:80
```
    Access at http://localhost:4200


### Notes
Ensure your .env file is not committed to Git by adding it to .gitignore.
If deploying the application, configure environment variables on the server instead of using a .env file.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

