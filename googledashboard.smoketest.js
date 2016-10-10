//smoke test google dashboard
describe('googledashboardsmoketest',function() {

	beforeEach(function() {
			var googlelogin = 'https://accounts.google.com/ServiceLogin';
		    var email = element(by.id('Email'));
		    var next = element(by.id('next'));
		    var EC = protractor.ExpectedConditions;
		    var pwd = element(by.id('Passwd'));
		    var signin = element(by.id('signIn'));
		    var tdurl = 'https://hydra-test-dot-hapara-dashboard.appspot.com/#/td/manage/';
		    var classitem = element(by.css('hap-class-item'));

		    browser.ignoreSynchronization = true;
		    browser.driver.manage().window().setSize(1280, 1024);
		    browser.get(googlelogin);
		    email.sendKeys('hscript-sept2.teacher@hcheckdm.zawadzki.co.nz');
		    next.click();
		    browser.wait(EC.visibilityOf(pwd), 5000);
		    pwd.sendKeys('passwd00');
		    signin.click();
		    browser.driver.get(tdurl);

			browser.wait(EC.visibilityOf(classitem),15000);
			classitem.click();	

		});

	it('should refresh a class', function() {
		var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var refresh = element(by.css('div.students-action-container:nth-child(5)'));
		var EC1 = protractor.ExpectedConditions;
		var sites = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:nth-child(2)'));
		var posts = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:nth-child(3)'));
		var comments = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:nth-child(4)'));
		console.log('test');
		studentpanel.isPresent();
		//browser.actions().mouseMove('elementdropdown').perform();
		browser.wait(EC1.visibilityOf(refresh),10000);
		refresh.click();
		browser.sleep(7000);
		browser.wait(EC1.visibilityOf(studentpanel),15000);
		console.log('refreshed');

	});

	it('should navigate to various tabs', function() {
		var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		//var refresh = element(by.css('div.students-action-container:nth-child(5)'));
		var sites = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(1)+ [role="presentation"]'));
		var posts = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(2)+ [role="presentation"]'));
		var comments = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(3)+ [role="presentation"]'));
		var EC6 = protractor.ExpectedConditions;
		console.log('test');
		//studentpanel.isPresent();

		//go to sites link
		browser.sleep(5000);
		browser.wait(EC6.visibilityOf(sites),5000);
		sites.click();
		browser.sleep(5000);
		//expect(sites.isPresent()).toEqual(true);

		//go to posts link
		browser.wait(EC6.visibilityOf(posts),5000);
		posts.click();
		browser.sleep(5000);
		//expect(posts.isPresent()).toEqual(true);

		//go to comments tab
		browser.wait(EC6.visibilityOf(comments),5000);
		comments.click();
		browser.sleep(5000);
		//expect(comments.isPresent()).toEqual(true);

	});

	it('should go to Gmail', function() {

		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var gmail = element(by.css('[ng-if="item.visible"]:nth-child(2)'));
		var EC2 = protractor.ExpectedConditions;
		var inbox = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:first-child'));
		var sent = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(1)+[role="presentation"]'));
		var trash = element(by.css('[ng-click="menuItemClick($event)"]:nth-child(2)+[role="presentation"]'));
		console.log('test');

		//browser.wait(EC2.elementToBeClickable(gmail),10000);
		browser.sleep(5000);
		gmail.click();
		browser.sleep(5000);
		//browser.wait(EC2.elementToBeClickable(inbox),15000);
		expect(inbox.isPresent()).toEqual(true);
		console.log('Gmail tab loaded');
		expect(inbox.getText()).toBe('Inbox');

		//go to sent folder
		sent.click();
		browser.sleep(5000);

		//go to trash folder
		trash.click();
		browser.sleep(5000);
	});

	it('should go to Sharing', function() {

		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var sharing = element(by.css('[ng-if="item.visible"]:nth-child(3)'));
		var EC3 = protractor.ExpectedConditions;
		var unshared = element(by.css('.df-tab-menu-active[ng-repeat="view in viewNames"]:first-child'));
		console.log('test');

		browser.wait(EC3.elementToBeClickable(sharing),15000);
		sharing.click();
		browser.sleep(7000);
		browser.wait(EC3.elementToBeClickable(unshared),10000);
		unshared.isPresent();
		browser.waitForAngular();
		console.log('Sharing tab loaded');
		expect(unshared.getText()).toBe('Unshared');
	});

	it('should change the line count', function() {

		//var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var linecount = element(by.css('student-action-line-count.ng-scope'));
		var count = element(by.css('.ng-scope[ng-repeat="lineCount in lineCounts"]:nth-child(2)'));
		var EC4 = protractor.ExpectedConditions;
		console.log('start line count test');
		//studentpanel.isPresent();
		//browser.actions().mouseMove('elementdropdown').perform();
		//browser.wait(EC4.visibilityOf(linecount),10000);
		browser.sleep(7000);
		browser.actions().mouseMove(linecount).perform();
		//linecount.click();
		//browser.waitForAngular();
		browser.wait(EC4.visibilityOf(count),15000);
		count.click();
		browser.sleep(4000);
	});

	//filter students based on groups test
	it('should filter based on groups', function() {
		var studentpanel = element(by.css('student-panel:nth-child(1) > div'));
		var togglebtn = element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1) [on-toggle="dropdownToggle(open)"]'));
		var editgrpbtn = element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1) [analytics-event="edit-groups"]'));
		var assigngrp = element(by.css(('[ng-repeat="group in groups"]:nth-child(3)')));
		var xgrp = element(by.css('.close:nth-child(1)'));
		var groupedit = element(by.css('[ng-if="groupEdit"]'));
		/*element for editing group name
		element(by.repeater('group in allGroups track by group.id').row(4));*/
		var groupselect = element(by.css('.group_3'));
		var EC1 = protractor.ExpectedConditions;
		console.log('test filter by groups');
		studentpanel.isPresent();
		browser.sleep(4000);
		//browser.actions().mouseMove('elementdropdown').perform();
		//expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isPresent()).toBe(true);
		
		//assign a group to a student
		togglebtn.click();
		editgrpbtn.click();
		assigngrp.click();
		xgrp.click();
		console.log('group 3 assigned');

		browser.sleep(5000);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1)')).isDisplayed()).toBe(true);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isDisplayed()).toBe(true);
		browser.wait(EC1.visibilityOf(groupedit),10000);
		browser.actions().mouseMove(groupedit).perform();
		browser.sleep(5000);
		groupselect.click();
		browser.sleep(7000);
		browser.wait(EC1.visibilityOf(studentpanel),15000);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(1)')).isDisplayed()).toBe(true);
		expect(element(by.css('[ng-repeat="item in standardItems track by item.student.email"]:nth-child(2)')).isPresent()).toBe(false);
	
		//unassign a group to a student
		togglebtn.click();
		editgrpbtn.click();
		assigngrp.click();
		xgrp.click();
		browser.sleep(3000);
		console.log('group 3 unassigned');

	});

	afterEach(function() {
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
