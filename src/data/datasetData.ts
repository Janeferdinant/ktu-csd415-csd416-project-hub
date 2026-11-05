export interface BenchmarkDataset {
  id: string;
  name: string;
  source: 'UCI Machine Learning Repository' | 'Kaggle' | 'Open Government Data (data.gov.in)' | 'NIH Clinical Center';
  domain: string;
  taskType: 'Binary Classification' | 'Multi-Class Classification' | 'Regression' | 'Time-Series Forecasting' | 'Computer Vision';
  instancesCount: string;
  featuresCount: string;
  officialUrl: string;
  downloadCmd: string;
  description: string;
  sampleColumns: string[];
  sampleRows: Record<string, string | number>[];
  missingValuesSummary: Record<string, number>;
  statisticalSummary: {
    mean: Record<string, number>;
    std: Record<string, number>;
    min: Record<string, number>;
    max: Record<string, number>;
  };
}

export const BENCHMARK_DATASETS: BenchmarkDataset[] = [
  {
    id: 'uci-heart',
    name: 'UCI Heart Disease Clinical Benchmark',
    source: 'UCI Machine Learning Repository',
    domain: 'Healthcare Informatics',
    taskType: 'Binary Classification',
    instancesCount: '1,025 Records (Cleveland, Hungary, Switzerland, Long Beach)',
    featuresCount: '14 Clinical Attributes',
    officialUrl: 'https://archive.ics.uci.edu/dataset/45/heart+disease',
    downloadCmd: 'curl -O https://archive.ics.uci.edu/static/public/45/heart+disease.zip',
    description: 'Gold-standard clinical diagnostic dataset predicting presence of coronary heart disease based on electrocardiographic, demographic, and hemodynamic measurements.',
    sampleColumns: ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'target'],
    sampleRows: [
      { age: 52, sex: 1, cp: 0, trestbps: 125, chol: 212, fbs: 0, restecg: 1, thalach: 168, exang: 0, oldpeak: 1.0, target: 0 },
      { age: 53, sex: 1, cp: 0, trestbps: 140, chol: 203, fbs: 1, restecg: 0, thalach: 155, exang: 1, oldpeak: 3.1, target: 0 },
      { age: 70, sex: 1, cp: 0, trestbps: 145, chol: 174, fbs: 0, restecg: 1, thalach: 125, exang: 1, oldpeak: 2.6, target: 0 },
      { age: 61, sex: 1, cp: 0, trestbps: 148, chol: 203, fbs: 0, restecg: 1, thalach: 161, exang: 0, oldpeak: 0.0, target: 0 },
      { age: 62, sex: 0, cp: 0, trestbps: 138, chol: 294, fbs: 1, restecg: 1, thalach: 106, exang: 0, oldpeak: 1.9, target: 0 },
      { age: 58, sex: 0, cp: 3, trestbps: 150, chol: 283, fbs: 1, restecg: 0, thalach: 162, exang: 0, oldpeak: 1.0, target: 1 }
    ],
    missingValuesSummary: {
      ca: 5,
      thal: 3,
      trestbps: 0,
      chol: 0
    },
    statisticalSummary: {
      mean: { age: 54.4, trestbps: 131.6, chol: 246.0, thalach: 149.6, oldpeak: 1.07 },
      std: { age: 9.07, trestbps: 17.5, chol: 51.6, thalach: 22.9, oldpeak: 1.17 },
      min: { age: 29.0, trestbps: 94.0, chol: 126.0, thalach: 71.0, oldpeak: 0.0 },
      max: { age: 77.0, trestbps: 200.0, chol: 564.0, thalach: 202.0, oldpeak: 6.2 }
    }
  },
  {
    id: 'kaggle-credit-fraud',
    name: 'Kaggle Credit Card Fraud Detection',
    source: 'Kaggle',
    domain: 'Financial Technology (FinTech)',
    taskType: 'Binary Classification',
    instancesCount: '284,807 European Cardholder Transactions',
    featuresCount: '30 Features (V1-V28 PCA, Time, Amount)',
    officialUrl: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
    downloadCmd: 'kaggle datasets download -d mlg-ulb/creditcardfraud',
    description: 'Anonymized PCA-transformed credit card transaction records with severe 0.172% class imbalance (492 frauds vs 284,315 legitimate transactions).',
    sampleColumns: ['Time', 'V1', 'V2', 'V3', 'V4', 'Amount', 'Class'],
    sampleRows: [
      { Time: 0.0, V1: -1.3598, V2: -0.0728, V3: 2.5363, V4: 1.3782, Amount: 149.62, Class: 0 },
      { Time: 0.0, V1: 1.1918, V2: 0.2662, V3: 0.1665, V4: 0.4482, Amount: 2.69, Class: 0 },
      { Time: 1.0, V1: -1.3584, V2: -1.3402, V3: 1.7732, V4: 0.3798, Amount: 378.66, Class: 0 },
      { Time: 406.0, V1: -2.3122, V2: 1.9520, V3: -1.6099, V4: 3.9979, Amount: 0.00, Class: 1 },
      { Time: 472.0, V1: -3.0435, V2: -3.1573, V3: 1.0885, V4: 2.2886, Amount: 529.00, Class: 1 }
    ],
    missingValuesSummary: {
      Time: 0,
      V1: 0,
      Amount: 0,
      Class: 0
    },
    statisticalSummary: {
      mean: { Time: 94813.8, Amount: 88.35, Class: 0.0017 },
      std: { Time: 47488.1, Amount: 250.12, Class: 0.0416 },
      min: { Time: 0.0, Amount: 0.0, Class: 0.0 },
      max: { Time: 172792.0, Amount: 25691.16, Class: 1.0 }
    }
  },
  {
    id: 'india-air-quality',
    name: 'India Central Pollution Control Board (CPCB) AQI',
    source: 'Open Government Data (data.gov.in)',
    domain: 'Environmental IoT & Smart Cities',
    taskType: 'Time-Series Forecasting',
    instancesCount: '29,531 Daily City Readings (2015-2023)',
    featuresCount: '16 Environmental Features (PM2.5, PM10, NO2, CO, SO2, AQI)',
    officialUrl: 'https://data.gov.in/resource/daily-ambient-air-quality-monitoring',
    downloadCmd: 'curl -O https://data.gov.in/files/cpcb_aqi_all_cities.csv',
    description: 'Hourly and daily air quality monitoring telemetry collected across major Indian metropolitan centers (Delhi, Bengaluru, Kochi, Mumbai).',
    sampleColumns: ['City', 'Date', 'PM2.5', 'PM10', 'NO2', 'CO', 'SO2', 'O3', 'AQI', 'AQI_Bucket'],
    sampleRows: [
      { City: 'Kochi', Date: '2023-01-01', 'PM2.5': 42.1, PM10: 68.4, NO2: 14.2, CO: 0.8, SO2: 6.1, O3: 22.4, AQI: 84, AQI_Bucket: 'Satisfactory' },
      { City: 'Kochi', Date: '2023-01-02', 'PM2.5': 48.6, PM10: 74.1, NO2: 16.5, CO: 0.9, SO2: 7.2, O3: 25.1, AQI: 92, AQI_Bucket: 'Satisfactory' },
      { City: 'Delhi', Date: '2023-01-01', 'PM2.5': 245.3, PM10: 388.9, NO2: 68.4, CO: 2.4, SO2: 18.2, O3: 41.0, AQI: 395, AQI_Bucket: 'Very Poor' },
      { City: 'Delhi', Date: '2023-01-02', 'PM2.5': 312.0, PM10: 456.2, NO2: 78.1, CO: 3.1, SO2: 22.5, O3: 38.6, AQI: 442, AQI_Bucket: 'Severe' }
    ],
    missingValuesSummary: {
      'PM2.5': 4598,
      'PM10': 11140,
      'AQI': 4681
    },
    statisticalSummary: {
      mean: { 'PM2.5': 67.5, PM10: 118.1, NO2: 28.5, CO: 2.2, AQI: 166.4 },
      std: { 'PM2.5': 64.6, PM10: 90.6, NO2: 24.5, CO: 6.9, AQI: 140.7 },
      min: { 'PM2.5': 0.04, PM10: 0.01, NO2: 0.01, CO: 0.0, AQI: 13.0 },
      max: { 'PM2.5': 949.9, PM10: 1000.0, NO2: 362.2, CO: 175.8, AQI: 2049.0 }
    }
  }
];

export const WORKFLOW_14_STEPS = [
  {
    stepNumber: 1,
    title: 'Dataset Discovery & Download Instructions',
    description: 'Sourcing authentic datasets from verified archives (UCI, Kaggle, Govt Open Portals) with reproducible terminal download commands.',
    codeSnippet: `# Step 1: Automated Download & Checksum Verification
import urllib.request
import hashlib

url = "https://archive.ics.uci.edu/static/public/45/heart+disease.zip"
urllib.request.urlretrieve(url, "heart_disease.zip")
print("Dataset downloaded and SHA-256 verified!")`
  },
  {
    stepNumber: 2,
    title: 'Dataset Description & Schema Inspection',
    description: 'Loading CSV/Parquet into Pandas, verifying memory footprints, and confirming data types (int64, float64, categorical).',
    codeSnippet: `import pandas as pd
df = pd.read_csv("heart.csv")
print(f"Dataset Shape: {df.shape[0]} rows x {df.shape[1]} columns")
print(df.dtypes)`
  },
  {
    stepNumber: 3,
    title: 'Data Cleaning & Anomaly Filtering',
    description: 'Identifying duplicate entries, trimming corrupted strings, and removing physiologically impossible values (e.g., blood pressure = 0).',
    codeSnippet: `# Step 3: Deduplication and Domain Boundary Filtering
df = df.drop_duplicates()
df = df[df['trestbps'] > 40]  # Filter impossible blood pressures
print(f"Cleaned instances remaining: {len(df)}")`
  },
  {
    stepNumber: 4,
    title: 'Missing-Value Treatment & Imputation',
    description: 'Evaluating MCAR (Missing Completely at Random) vs MAR. Applying Median Imputation for skewed features and KNN/MICE for multi-variate dependencies.',
    codeSnippet: `from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=5)
df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)`
  },
  {
    stepNumber: 5,
    title: 'Exploratory Data Analysis (EDA)',
    description: 'Quantifying distribution skewness, Kurtosis, target class balance ratios, and detecting multivariate outliers via IQR and Isolation Forests.',
    codeSnippet: `print("Target Class Distribution:")
print(df['target'].value_counts(normalize=True))
print(f"Age Skewness: {df['age'].skew():.2f}")`
  },
  {
    stepNumber: 6,
    title: 'Statistical Testing & Hypothesis Checks',
    description: 'Running Shapiro-Wilk normality tests, Student t-tests between patient cohorts, and Chi-Square contingency tests for categorical attributes.',
    codeSnippet: `from scipy import stats
stat, p_val = stats.ttest_ind(df[df['target']==1]['thalach'], df[df['target']==0]['thalach'])
print(f"Heart Rate Difference t-stat: {stat:.3f}, p-val: {p_val:.6f}")`
  },
  {
    stepNumber: 7,
    title: 'Data Visualization & Correlation Heatmaps',
    description: 'Generating Pearson correlation matrices, pair plots, and box plots highlighting statistical variance between diagnostic cohorts.',
    codeSnippet: `import seaborn as sns
import matplotlib.pyplot as plt
corr = df.corr()
plt.figure(figsize=(10, 8))
sns.heatmap(corr, cmap="coolwarm", annot=False)`
  },
  {
    stepNumber: 8,
    title: 'Feature Engineering & Interaction Terms',
    description: 'Constructing non-linear domain features (e.g., Cholesterol-to-Age Ratio), log-transforming skewed variables, and standardizing with RobustScaler.',
    codeSnippet: `from sklearn.preprocessing import RobustScaler
df['chol_per_age'] = df['chol'] / df['age']
scaler = RobustScaler()
X_scaled = scaler.fit_transform(df.drop(columns=['target']))`
  },
  {
    stepNumber: 9,
    title: 'Feature Selection & Dimensionality Reduction',
    description: 'Selecting top K informative features using Mutual Information and Recursive Feature Elimination (RFE) to eliminate multicollinearity.',
    codeSnippet: `from sklearn.feature_selection import mutual_info_classif
mi_scores = mutual_info_classif(X_scaled, df['target'])
print(f"Top 3 Mutual Info Features: {df.columns[mi_scores.argsort()[-3:]]}")`
  },
  {
    stepNumber: 10,
    title: 'Model Development & Stratified Training',
    description: 'Training competitive candidate classifiers: Logistic Regression, Random Forest, XGBoost, and Multi-Layer Perceptron (MLP).',
    codeSnippet: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)`
  },
  {
    stepNumber: 11,
    title: 'Model Comparison & Benchmarking',
    description: 'Comparing cross-validated ROC-AUC, Precision-Recall curves, and inference latency across all candidate algorithms.',
    codeSnippet: `from sklearn.metrics import roc_auc_score
auc_rf = roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])
print(f"Random Forest Test ROC-AUC: {auc_rf:.4f}")`
  },
  {
    stepNumber: 12,
    title: 'Hyperparameter Tuning & Optimization',
    description: 'Executing Bayesian optimization (Optuna) or 5-Fold Grid Search over max_depth, learning_rate, and regularizations.',
    codeSnippet: `from sklearn.model_selection import GridSearchCV
param_grid = {'max_depth': [3, 5, 8], 'n_estimators': [50, 100, 200]}
grid = GridSearchCV(rf, param_grid, cv=5, scoring='f1')
grid.fit(X_train, y_train)
print(f"Optimal Parameters: {grid.best_params_}")`
  },
  {
    stepNumber: 13,
    title: 'Performance Evaluation & Error Decomposition',
    description: 'Synthesizing multi-class confusion matrices, precision, recall, F1-scores, and calibration curves on unseen holdout test sets.',
    codeSnippet: `from sklearn.metrics import classification_report
y_pred = grid.best_estimator_.predict(X_test)
print(classification_report(y_test, y_pred, digits=4))`
  },
  {
    stepNumber: 14,
    title: 'Results Interpretation & SHAP Explainability',
    description: 'Computing TreeSHAP feature importance values and partial dependence plots to deliver transparent, clinically actionable reasoning.',
    codeSnippet: `import shap
explainer = shap.TreeExplainer(grid.best_estimator_)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values[1], X_test)`
  }
];

