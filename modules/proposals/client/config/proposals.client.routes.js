// =========================================================================
//
// All the client side routes for proposals
//
// =========================================================================
(function () {
	'use strict';

	angular.module('proposals.routes').config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		// -------------------------------------------------------------------------
		//
		// this is the top level, abstract route for all proposal routes, it only
		// contians the ui-view that all other routes get rendered in
		//
		// -------------------------------------------------------------------------
		.state ('proposals', {
			abstract: true,
			url: '/proposals',
			template: '<ui-view/>',
			resolve: {
				capabilities: function (CapabilitiesService) {
					return CapabilitiesService.query ();
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// proposal listing. Resolve to all proposals in the system and place that in
		// the scope. listing itself is done through a directive
		//
		// -------------------------------------------------------------------------
		.state ('proposals.list', {
			url: '',
			templateUrl: '/modules/proposals/client/views/list-proposals.client.view.html',
			data: {
				pageTitle: 'Proposals List'
			},
			ncyBreadcrumb: {
				label: 'All proposals'
			},
			resolve: {
				proposals: function ($stateParams, ProposalsService) {
					return ProposalsService.query ();
				}
			},
			controller: 'ProposalsListController',
			controllerAs: 'vm',
			roles: ['admin', 'gov']
		})
		// -------------------------------------------------------------------------
		//
		// view a proposal, resolve the proposal data
		//
		// -------------------------------------------------------------------------
		.state ('proposals.viewcwu', {
			url: '/cwu/:proposalId',
			data: {
				roles: ['user']
			},
			templateUrl: '/modules/proposals/client/views/cwu-proposal-view.html',
			controller: 'ProposalViewController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// view a proposal, resolve the proposal data
		//
		// -------------------------------------------------------------------------
		.state ('proposals.viewswu', {
			url: '/swu/:proposalId',
			data: {
				roles: ['user']
			},
			templateUrl: '/modules/proposals/client/views/swu-proposal-view.html',
			controller: 'ProposalViewSWUController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// the base for editing
		//
		// -------------------------------------------------------------------------
		.state ('proposaladmin', {
			abstract: true,
			url: '/proposaladmin',
			template: '<ui-view/>',
			data: {
				notroles: ['gov', 'guest']
			},
			resolve: {
				capabilities: function (CapabilitiesService) {
					return CapabilitiesService.query ();
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// edit a proposal
		//
		// -------------------------------------------------------------------------
		.state ('proposaladmin.editcwu', {
			url: '/:proposalId/editcwu/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov']
			},
			templateUrl: '/modules/proposals/client/views/cwu-proposal-edit.html',
			controller: 'ProposalEditController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				editing: function () { return true; },
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new proposal and edit it
		//
		// -------------------------------------------------------------------------
		.state ('proposaladmin.createcwu', {
			url: '/createcwu/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov']
			},
			templateUrl: '/modules/proposals/client/views/cwu-proposal-edit.html',
			controller: 'ProposalEditController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return new ProposalsService ();
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				},
				editing: function () { return false; }
			}
		})
		// -------------------------------------------------------------------------
		//
		// edit a proposal
		//
		// -------------------------------------------------------------------------
		.state ('proposaladmin.editswu', {
			url: '/:proposalId/editswu/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov']
			},
			templateUrl: '/modules/proposals/client/views/swu-proposal-edit.html',
			controller: 'ProposalEditSWUController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return ProposalsService.get ({
						proposalId: $stateParams.proposalId
					}).$promise;
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				editing: function () { return true; },
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				}
			}
		})
		// -------------------------------------------------------------------------
		//
		// create a new proposal and edit it
		//
		// -------------------------------------------------------------------------
		.state ('proposaladmin.createswu', {
			url: '/createswu/:opportunityId',
			data: {
				roles: ['user'],
				notroles: ['gov']
			},
			templateUrl: '/modules/proposals/client/views/swu-proposal-edit.html',
			controller: 'ProposalEditSWUController',
			controllerAs: 'ppp',
			bindToController: true,
			resolve: {
				proposal: function ($stateParams, ProposalsService) {
					return new ProposalsService ();
				},
				opportunity: function ($stateParams, OpportunitiesService) {
					return OpportunitiesService.get({
						opportunityId: $stateParams.opportunityId
					}).$promise;
				},
				org: function (Authentication, OrgsService) {
					var orgs = Authentication.user.orgsAdmin || [null];
					var org = orgs[0];
					if (org) return OrgsService.get ({orgId:org}).$promise;
					else return null;
				},
				editing: function () { return false; }
			}
		})
		;
	}]);
}());


