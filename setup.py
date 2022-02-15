import setuptools


with open("./README.md", 'r') as f:
    description = f.read()

with open("./LICENSE.md", 'r') as f:
    _license = f.read()

with open("./requirements.txt", 'r') as f:
    requirements = f.read().strip().split('\n')

setuptools.setup(
    name='Document and Content Management Software',
    version='1.0',
    description='The software was developed to store data and manage data for documents.',
    license=_license,
    long_description=description,
    author='Valentin Svet; Val-E',
    author_email='valentin.svet.12345@gmail.com',
    url="http://www.github.com/Val-E/Document_and_Content_Management_System/",
    packages=['flask_backend'],
    install_requires=requirements,
    scripts=['flask_backend/app.py']
)
