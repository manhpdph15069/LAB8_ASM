app.controller("authority-ctrl", function($scope, $http, $location){
    $scope.roles=[];
    $scope.admins=[];
    $scope.authorities=[];

    $scope.initialize=function () {
        $http.get("/rest/roles").then(resp=>{
            $scope.roles=resp.data;
        })

        $http.get("/rest/accounts?admin=false").then(resp=>{
            $scope.admins=resp.data;
        })

        $http.get("/rest/authorities?admin=false").then(resp => {
            $scope.authorities = resp.data;
        }).catch(e=>{
            $location.path("/unauthorize");

        })
    }


    $scope.authority_of=function (acc,role) {
        if ($scope.authorities){
            return $scope.authorities.find(ur=>ur.account.username==acc.username && ur.role.id==role.id);
        }
    }
    $scope.authority_changed = function (acc,role) {
        var authority = $scope.authority_of(acc,role);
        if (authority){//thu hoi quyen
            $scope.revoke_authority(authority);
        }else {//chua duoc cap quyen=>cap quyen(them moi)
            authority={account:acc,role:role};
            $scope.grant_authority(authority);
        }
    }

    $scope.grant_authority = function (authority) {
        Swal.fire({
            title: 'Bạn chắc chắn muốn cấp quyền cho tài khoản này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                $http.post(`/rest/authorities`,authority).then(resp=>{
                    $scope.authorities.push(resp.data)
                    Swal.fire('Cấp quyền thành công!', '', 'success')
                }).catch(e=>{
                    alert("cq loi")
                    console.log(e);
                });
            }
        })


    }
    
    $scope.revoke_authority = function (authority) {
        Swal.fire({
            title: 'Bạn chắc chắn muốn cấp quyền cho tài khoản này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete(`/rest/authorities/${authority.id}`).then(resp=>{
                    var index =$scope.authorities.findIndex(a=>a.id == authority.id);
                    $scope.authorities.slice(index,1);
                    Swal.fire('Thu hồi quyền thành công!', '', 'success')
                }).catch(e=>{
                    alert("thu hoi loi")
                    console.log(e);
                });
            }
        })



    }
    $scope.initialize();
});