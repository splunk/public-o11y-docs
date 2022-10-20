FROM sphinxdoc/sphinx

WORKDIR /docs
COPY requirements.txt /docs
RUN pip3 install -r requirements.txt
RUN pip3 install sphinx-autobuild
ENTRYPOINT ["tail", "-f", "/dev/null"]