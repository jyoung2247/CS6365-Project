# CS6365-Project
CS6365 Project - Steam Game Recommender
To run project:

*Backend*

cd CS6365-Project

conda create --name steamrec

conda activate steamrec

conda install -c conda-forge flask=2.2.3

conda install -c conda-forge requests=2.28.2

conda install -c conda-forge scikit-surprise=1.1.3

conda install -c conda-forge pandas=1.5.3

pip install howlongtobeatpy

python back-end/app.py

*Frontend*

cd front-end

npm install

npm install react-spinners

npm start
