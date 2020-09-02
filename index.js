const githubUserName = 'TyrangYang';
const collaborateProjectNameList = ['Scheduler-App'];

fetch(`https://api.github.com/users/${githubUserName}/starred`)
    .then((res) => res.json())
    .then((data) => {
        // select I need
        let selfProject = data.filter(
            (e) =>
                e.owner.login === githubUserName ||
                collaborateProjectNameList.includes(e.name)
        );

        // add to github display section
        const displaySelfProject = document.querySelector('.githubProject');
        selfProject.forEach((e) => {
            let tmpEle = document.createElement('li');
            tmpEle.className = 'card';
            tmpEle.id = e.name;

            let cardTitle = document.createElement('a');
            let cardDescription = document.createElement('p');
            let starDiv = document.createElement('div');
            let starIcon = document.createElement('i');
            let starNum = document.createElement('span');

            cardTitle.textContent = e.name;
            cardDescription.textContent = e.description;
            cardTitle.href = e.html_url;
            cardTitle.target = '_blank';

            starIcon.className = 'far fa-star';
            starNum.textContent = '   ' + e.stargazers_count;
            starDiv.className = 'starDiv';
            starDiv.append(starIcon, starNum);
            tmpEle.append(cardTitle, cardDescription, starDiv);

            displaySelfProject.append(tmpEle);
        });
    })
    .catch((err) => console.log(err));
