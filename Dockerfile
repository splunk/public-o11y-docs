FROM sphinxdoc/sphinx

WORKDIR /docs
COPY requirements.txt /docs
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt --force-reinstall --no-cache-dir --root-user-action=ignore
RUN pip3 install sphinx-autobuild --root-user-action=ignore
ENTRYPOINT ["tail", "-f", "/dev/null"]