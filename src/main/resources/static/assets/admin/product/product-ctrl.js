app.controller("product-ctrl", function($scope, $http){
    $scope.items = [];
    $scope.cates = [];
    $scope.form = {};

    $scope.initialize = function () {
        $http.get("/rest/products").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.createDate = new Date(item.createDate);
            })
        });
        $http.get("/rest/category").then(resp => {
            $scope.cates = resp.data;
        });
    }

    $scope.initialize();
    $scope.pager = {
        page:0,
        size:10,
        get items(){
            var start = this.page * this.size;
            return $scope.items.slice(start,start +this.size);
        },
        get count(){
            return Math.ceil(1.0*$scope.items.length/this.size);
        },
        first(){
            this.page =0;
        },
        prev(){
            this.page--;
            if (this.page<0){
                this.last();
            }
        },
        next(){
            this.page++;
            if (this.page>=this.count){
                this.first();
            }
        },
        last(){
            this.page=this.count-1;
        }
    }


    $scope.create = function(){
        Swal.fire({
            title: 'Bạn chắc chắn muốn tạo sản phẩm này?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var item = angular.copy($scope.form);
                $http.post(`/rest/products`,item).then(resp=>{
                    resp.data.createDate = new Date(resp.data.createDate)
                    $scope.items.push(resp.data);
                    $scope.reset();
                    Swal.fire('Thêm mới thành công!', '', 'success');
                }).catch(error=>{
                    alert("loi them sp");
                    console.log(error);
                });

            } else if (result.isDenied) {
                Swal.fire('Không thêm sản phẩm', '', 'info')
            }
        })
    }
    $scope.update = function () {
        Swal.fire({
            title: 'Bạn chắc chắn muốn tạo sản phẩm này?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var item = angular.copy($scope.form);
                $http.put(`/rest/products/${item.id}`,item).then(resp=>{
                    var index = $scope.items.findIndex(p=>p.id==item.id);
                    $scope.items[index] = item;
                    Swal.fire('Cập nhập thành công!', '', 'success');
                }).catch(e=>{
                    alert("cap nhap loi");
                    console.log(e);
                });

            } else if (result.isDenied) {
                Swal.fire('Không cập nhập sản phẩm', '', 'info')
            }
        })
    }
    $scope.delete = function(item){
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa sản phẩm?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $http.delete(`/rest/products/${item.id}`).then(resp=>{
                    var index = $scope.items.findIndex(p=>p.id==item.id);
                    $scope.items.splice(index,1);
                    $scope.reset();
                    Swal.fire('Xóa thành công!', '', 'success');
                }).catch(e=>{
                    alert("loi xoa");
                    console.log(e);
                })
            } else if (result.isDenied) {
                Swal.fire('Không xóa sản phẩm', '', 'info')
            }
        })



    }
    $scope.reset = function () {
        $scope.form = {
            createDate: new Date(),
            image: 'upload.jpg',
            available: 0
        }
    }
    $scope.edit = function(item){
        $scope.form= angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show')
    }

    $scope.imageChanged = function(files){
        var data =new FormData();
        data.append('file',files[0]);
        $http.post('/rest/upload/images',data,{
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        }).then(resp=>{
            $scope.form.image = resp.data.name;
        }).catch(error=>{
            alert("Upload loi");
            console.log(error);
        })
    }


});