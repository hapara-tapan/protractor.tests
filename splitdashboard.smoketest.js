//smoke test google dashboard
describe('splitdashboardsmoketest',function() {

	beforeAll(function() {
			var googlelogin = 'https://accounts.google.com/ServiceLogin';
		    var email = element(by.id('Email'));
		    var next = element(by.id('next'));
		    //var EC = protractor.ExpectedConditions;
		    var pwd = element(by.id('Passwd'));
		    var signin = element(by.id('signIn'));
		    var tdurl = 'https://hydra-test-dot-hapara-dashboard.appspot.com/#/td/boomslang-1617@groups.zawadzki.co.nz/dashboard//';

		    browser.ignoreSynchronization = true;
		    browser.driver.manage().window().setSize(1280, 1024);
		    browser.get(googlelogin);
		    email.sendKeys('splt1@ts.school.hapara.com');
		    next.click();
		    browser.wait(EC.visibilityOf(pwd), 5000);
		    pwd.sendKeys('passwd00');
		    signin.click();
		    browser.driver.get(tdurl);
		    browser.sleep(5000);
		});

	it('[SPLIT] should change the line count', function() {

		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		//var dashboardlnk = element(by.css('[ng-repeat="item in api.subNav.items"]:nth-child(1)'));
		var linecount = element(by.css('student-action-line-count.ng-scope'));
		var count3 = element(by.css('.ng-scope[ng-repeat="lineCount in lineCounts"]:nth-child(2)'));
		var count5 = element(by.css('.ng-scope[ng-repeat="lineCount in lineCounts"]:nth-child(3)'));
		var EC4 = protractor.ExpectedConditions;

		// select linecount 3
		browser.sleep(3000);
		browser.actions().mouseMove(linecount).perform();
		browser.wait(EC4.visibilityOf(count3),15000);
		count3.click();
		browser.sleep(2000);

		// select linecount 5
		browser.actions().mouseMove(linecount).perform();
		browser.wait(EC4.visibilityOf(count5),15000);
		count5.click();
		browser.sleep(2000);

		//give time for next test to run
		browser.sleep(2000);
	});

	it('[SPLIT]should sort students by name', function() {
		var firstpanel = element(by.css('.panel-title-content'));
		var sortlink = element(by.css('[uib-tooltip="Click to order students by name"]'));
		var sortbyfname = element(by.css('[ng-click="nameSort(\'first-az\')"]'));
		var sortbylname = element(by.css('[ng-click="nameSort(\'last-az\')"]'));
		var EC1 = protractor.ExpectedConditions;

		browser.wait(EC1.visibilityOf(sortlink),5000);
		browser.actions().mouseMove(sortlink).perform();
		browser.sleep(2000);
		sortbylname.click();
		browser.sleep(2000);

		browser.wait(EC1.visibilityOf(sortlink),5000);
		browser.actions().mouseMove(sortlink).perform();
		browser.sleep(2000);
		sortbyfname.click();
		browser.sleep(2000);

		//give time for next test to run
		browser.sleep(2000);
	});

	//filter students based on groups test
	it('[SPLIT]should filter based on groups', function() {
		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var togglebtn = element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1) [on-toggle="dropdownToggle(open)"]'));
		var editgrpbtn = element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1) [analytics-event="edit-groups"]'));
		var assigngrp = element(by.css('[ng-repeat="group in groups"]:nth-child(3)'));
		var xgrp = element(by.css('.close:nth-child(1)'));
		var groupedit = element(by.css('[ng-if="groupEdit"]'));
		var groupselect = element(by.css('.group_3'));
		//var EC1 = protractor.ExpectedConditions;
		console.log('test filter by groups');
		//expect(studentpanel.isPresent()).toBe(true);
		browser.sleep(2000);
		
		//assign a group to a student
		browser.sleep(3000);
		togglebtn.click();
		editgrpbtn.click();
		assigngrp.click();
		xgrp.click();
		console.log('group 3 assigned');

		browser.sleep(3000);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1)')).isDisplayed()).toBe(true);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isDisplayed()).toBe(true);
		browser.wait(EC.visibilityOf(groupedit),10000);
		browser.actions().mouseMove(groupedit).perform();
		browser.sleep(3000);
		groupselect.click();
		browser.sleep(4000);
		//browser.wait(EC.visibilityOf(studentpanel),15000);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1)')).isDisplayed()).toBe(true);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isPresent()).toBe(false);
	
		//unassign a group to a student
		togglebtn.click();
		editgrpbtn.click();
		assigngrp.click();
		xgrp.click();
		browser.sleep(3000);
		console.log('group 3 unassigned');

		browser.sleep(3000);
		browser.wait(EC.visibilityOf(groupedit),10000);
		browser.actions().mouseMove(groupedit).perform();
		browser.sleep(3000);
		groupselect.click();
		browser.sleep(4000);
		//browser.wait(EC.visibilityOf(studentpanel),15000);
		//expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1)')).isDisplayed()).toBe(true);
		//expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isPresent()).toBe(true);

		//give time for next test to run
		browser.sleep(2000);

	});

	it('[SPLIT]should verify smartshare button is present', function() {
		var share = element(by.css('[id="smartshare-trigger"]'));
		var cancelshare = element(by.css('[ng-click="cancelModal()"]'));
		
		// verify that smartshare button is present
		browser.sleep(2000);
		expect(share.isDisplayed()).toBe(true);
		share.click();
		cancelshare.click();

		//give time for next test to run
		browser.sleep(2000);
	});

	it('[SPLIT]should hover over a document and verify that an image pops up', function() {
		var dochover = element(by.css('[popup-prepare="preparePopupContent(doc)"]:first-child'));
		var img = element(by.css('.image'));
		var EC1 = protractor.ExpectedConditions;

		browser.wait(EC1.visibilityOf(dochover),10000);
		browser.sleep(2000);
		browser.actions().mouseMove(dochover).perform();
		browser.sleep(2000);
		expect(img.isDisplayed()).toBe(true);

		//give time for next test to run
		browser.sleep(2000);
	});

	it('[SPLIT]should navigate to various tabs on dashboard', function() {
		//define elements
		var sites = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(1)+ [role="presentation"]'));
		var posts = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(2)+ [role="presentation"]'));
		var comments = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(3)+ [role="presentation"]'));
		var EC6 = protractor.ExpectedConditions;

		//go to sites link
		browser.sleep(3000);
		browser.wait(EC6.visibilityOf(sites),5000);
		sites.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to navigate to Sites tab');
		});
		
		//go to posts link
		browser.wait(EC6.visibilityOf(posts),5000);
		posts.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to navigate to Posts tab');
		});

		//go to comments tab
		browser.wait(EC6.visibilityOf(comments),5000);
		comments.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to navigate to Comments tab');
		});

		//give time for next test to run
		browser.sleep(2000);

	});

	it('[SPLIT]should go to Gmail', function() {
		//define elements
		var gmail = element(by.css('[ng-if="item.visible"]:nth-child(2)'));
		//var EC2 = protractor.ExpectedConditions;
		var inbox = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:first-child'));
		var sent = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(1)+[role="presentation"]'));
		var trash = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(2)+[role="presentation"]'));

		//click on gmail tab
		browser.sleep(2000);
		gmail.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to go to GMail tab');
		});

		//verify that inbox tab is present
		expect(inbox.isPresent()).toEqual(true);
		console.log('Gmail tab loaded');
		expect(inbox.getText()).toBe('Inbox');

		//go to sent folder
		sent.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to go to Inbox folder');
		});

		//go to trash folder
		trash.click().then(function() {
		browser.sleep(3000);
		console.log('Successfully able to go to Trash folder');
		});

		//give time for next test to run
		browser.sleep(2000);
	});


	it('[SPLIT]should go to Sharing', function() {

		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var sharing = element(by.css('[ng-if="item.visible"]:nth-child(3)'));
		//var unshared = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:first-child'));
		sharing.click();
		//give time for next test to run
		browser.sleep(4000);
	});

	it('[SPLIT]should perform navigate,search,favorite and unfavorite actions on classes', function() {
		var mngclassdropdown = element(by.css('[ng-mouseover="openClassesDropdown()"]'));
		var dashhome = element(by.css('[data-action="manage-classes"]'));
		var gotoclass = element(by.css('[ng-repeat="item in api.classes.my | orderBy:order track by item.id"]'));
		var allclasses = element(by.css('[ui-sref="dashboard.manage-classes-all({ q: q, domain: domain, school: school })"]'));
		var myclasses = element(by.css('[ui-sref="dashboard.manage-classes({ q: q, domain: domain, school: school })"]'));
		var unfavorite = element(by.css('.fa-star-o'));
		var favorite = element(by.css('.fa-star'));
		var dosearch = element(by.css('[ng-click="doSearch()"]'));
		var searchq = element(by.css('[ng-model="search.q"]'));

		//navigate from inside a class to Manage Classes page
		browser.sleep(3000);
		browser.actions().mouseMove(mngclassdropdown).perform();
		browser.sleep(2000);
		dashhome.click();
		browser.sleep(2000);

		//Go to all classes tab and verify that user can see unfavorited classes
		allclasses.click();
		browser.sleep(2000);
		expect(unfavorite.isDisplayed()).toBe(true);

		//search for a class
		browser.sleep(2000);
		searchq.click();
		searchq.sendKeys("algebra");
		browser.sleep(2000);
		dosearch.click();
		browser.sleep(2000);

		//favorite the searched class
		unfavorite.click();
		browser.sleep(2000);
		myclasses.click();
		browser.sleep(2000);

		//unfavorite the searched class
		favorite.click();
		browser.sleep(2000);

		//give time for next test to run
		browser.sleep(2000);

	});

	it('[SPLIT]should edit a class', function() {
		var mngclassdropdown = element(by.css('[ng-mouseover="openClassesDropdown()"]'));
		var dashhome = element(by.css('[data-action="manage-classes"]'));
		var editclass = element(by.css('[ng-if="!editing"]'));
		var nickname = element(by.css('[ng-model="data.Prefs.Nickname"]'));
		var colorpink = element(by.css('button.swatch-1'));
		var colorblue = element(by.css('button.swatch-15'));
		var save = element(by.css('[ng-click="save()"]'));
		var reset = element(by.css('[ng-click="reset()"]'));
		var close = element(by.css('[analytics-event="Cancel Edit Class"]'));

		//navigate from inside a class to Manage Classes page
		browser.sleep(3000);
		browser.actions().mouseMove(mngclassdropdown).perform();
		browser.sleep(2000);
		dashhome.click();
		browser.sleep(2000);

		//click on edit, and then click on close button
		editclass.click();
		nickname.sendKeys("byprotractor");
		colorpink.click();
		close.click();
		browser.sleep(2000);

		//click on edit, and then click on reset button
		editclass.click();
		nickname.sendKeys("byprotractor");
		colorpink.click();
		reset.click();
		browser.sleep(2000);

		//edit a class
		editclass.click();
		nickname.sendKeys("byprotractor");
		colorpink.click();
		save.click();
		browser.sleep(2000);

		//edit the class back to its original name and color
		editclass.click();
		nickname.clear();
		nickname.sendKeys("boomslang-1617");
		colorblue.click();
		save.click();
		browser.sleep(2000);

		//give time for next test to run
		browser.sleep(2000);

	});

	it('[SPLIT]should filter domains', function() {
		var mngclassdropdown = element(by.css('[ng-mouseover="openClassesDropdown()"]'));
		var dashhome = element(by.css('[data-action="manage-classes"]'));
		var domaindropdown = element(by.css('[ng-model="search.domain"]'));
		var option1 = element(by.cssContainingText('option', 'groups.zawadzki.co.nz'));
		var dosearch = element(by.css('[ng-click="doSearch()"]'));
		var searchq = element(by.css('[ng-model="search.q"]'));
		var schooldropdown = element(by.model('search.school'));
		var schooloption1 = element(by.cssContainingText('option', 'Berkers (b1)'));
		var noclasstxt = element(by.cssContainingText('.ng-scope','No classes found'))
		//var classitem = element(by.css('hap-class-item'));
		//var star = element(by.css('.fa-star'));

		//navigate from inside a class to Manage Classes page
		browser.sleep(5000);
		browser.actions().mouseMove(mngclassdropdown).perform();
		dashhome.click();
		browser.sleep(2000);

		//search for a class from a domain that you are not going to filter on
		browser.sleep(2000);
		searchq.click();
		searchq.sendKeys("grade1");
		browser.sleep(3000);
		dosearch.click();

		browser.sleep(2000);
		domaindropdown.click();
		option1.click();
		browser.sleep(2000);
		schooldropdown.click();
		schooloption1.click();
		browser.sleep(4000);
		expect(noclasstxt.isDisplayed()).toBe(true);

		//give time for next test to run
		browser.sleep(2000);	
	});

	afterAll(function() {
			console.log('afterEach');
			var EC5 = protractor.ExpectedConditions;
			var logoutcaret = element(by.css('[ng-if="api.userNav.items"]'));
    		var logoutbtn = element(by.css('[ng-click="openModal()"]'));
    		var googlelogout = element(by.css('[ng-click="logout()"]'));	

    		browser.wait(EC5.visibilityOf(logoutcaret),15000);
			logoutcaret.click();
    		logoutbtn.click();
    		googlelogout.click();
        });
});