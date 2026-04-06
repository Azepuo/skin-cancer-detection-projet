# Skin Cancer Detection Mini-Project

This project contains a Jupyter Notebook designed to read, process, and classify the HAM10000 Skin Cancer Dataset using a simple Convolutional Neural Network (CNN).

## Getting Started

Follow these steps to set up the project on your machine.

### 1. Install Dependencies

You will need Python 3 installed. It is highly recommended to use a virtual environment.
Run the following command to install the required libraries:

```bash
pip install -r requirements.txt
```

### 2. Setting Up Kaggle API

Since the dataset is sourced from Kaggle, you'll need your Kaggle API key (`kaggle.json`).

1. Log into [Kaggle](https://www.kaggle.com).
2. Go to your Account Settings and scroll down to the "API" section.
3. Click "Create New Token". This will download a `kaggle.json` file.
4. Place the `kaggle.json` file in the correct location for your OS:
   - **Windows**: `C:\Users\<Your-Username>\.kaggle\kaggle.json`
   - **Mac/Linux**: `~/.kaggle/kaggle.json`

*(Make sure to set proper permissions on Mac/Linux: `chmod 600 ~/.kaggle/kaggle.json`)*

### 3. Run the Jupyter Notebook

In the project folder, run the following command to start Jupyter:

```bash
jupyter notebook
```

Open `Skin_Cancer_Detection.ipynb`. The notebook contains instructions and code to:
- Automatically download the dataset from Kaggle directly.
- Unzip the dataset.
- Load and preprocess the images.
- Train the model.
- Evaluate its performance.
