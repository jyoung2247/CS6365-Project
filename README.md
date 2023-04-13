# CS6365-Project
CS6365 Project - Steam Game Recommender
To run project:

*Installing dependencies*

*Backend*

cd CS6365-Project

conda create --name steamrec

conda activate steamrec

conda install -c conda-forge flask=2.2.3

 conda install -c conda-forge flask_cors=3.0.10

conda install -c conda-forge requests=2.28.2

conda install -c conda-forge scikit-surprise=1.1.3

conda install -c conda-forge pandas=1.5.3

 conda install -c conda-forge nodejs=18.15.0

pip install howlongtobeatpy



*Frontend*

cd front-end

npm install

*Running*

*Backend*

conda activate steamrec

cd CS6365-Project

python back-end/app.py

*Frontend*

conda activate steamrec

Open second miniconda terminal

cd front-end

npm start