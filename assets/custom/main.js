				function getUrlParameter(name) {
					name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
					var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
					var results = regex.exec(window.location.search);
					return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
				};


				$(document).ready(function () {
					$.get("https://intellgentcms.herokuapp.com/api/pageCategories",data=>{
						data.pageCategories.filter(pc=> pc.location ==="Barra").forEach((pc)=>{
							$("#last-predefined-on-bar").after(`             
							 <li class="nav-item dropdown work-please" >
								<a class="nav-link link mbr-black text-black dropdown-toggle display-4" href="index.html" aria-expanded="true" data-toggle="dropdown-submenu">
								${pc.name}</a>
								<div class="dropdown-menu menu-doble">
									<div class="container" style="padding: 0; margin: 0;">
										<div class="row" style="padding: 0; margin: 0;">
											<div class="col-md-6 col-12" id ="page-menu-column-1-${pc.name.replace(/\s/g, '')}" style="padding: 0; margin: 0;">
											</div>
											<div class="col-md-6 col-12" id ="page-menu-column-2-${pc.name.replace(/\s/g, '')}">
											</div>
										</div>
									</div>
								</div>
							</li>`);

						})
						//Categories inside a category, the father is placed on the bar
						let underBarCategories = data.pageCategories.filter(pc=> pc.location !=="Barra");
						underBarCategories.forEach((pc)=>{
							$(`#page-menu-column-2-${pc.location.replace(/\s/g, '')}`).append(`           

	                		<div class="dropdown">
	                	  		<a class="mbr-black text-black dropdown-item dropdown-toggle display-4" href="index.html" data-toggle="dropdown-submenu" aria-expanded="true">${pc.name}</a>
	                  			<div class="dropdown-menu dropdown-submenu" id = "under-bar-category-${pc.name.replace(/\s/g, '')}">
	                 			 </div>
	                		</div>

	                `);
					})

						$.get("https://intellgentcms.herokuapp.com/api/pages",data=>{

							data.pages.filter(p=>p.pageCategory==="Barra").forEach(p=>{
								$("#last-predefined-on-bar").after(`
									<li class="nav-item work-please">
	                					<a class="nav-link link mbr-black text-black display-4" href='interna?name=${p.url}'>${p.name}</a>
	              					</li>
									`);
							})
								//pages inside categories inside a category, the father category is placed on the bar
								let underUnderBarPages = data.pages.filter(p=> underBarCategories.find(  pc=> pc.name===p.pageCategory) )
								
								//pages inside a category placed on the bar 
								let underBarPages = data.pages.filter(p=> !underBarCategories.find(pc=>pc.name===p.pageCategory) )

								//pages inside a category placed on the bar x2
								let lastUnderBarPages = underBarPages.splice(4);
								underBarPages.forEach(p=>{
								$(`#page-menu-column-1-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna?name=${p.url} " id ="nav-bar-item" >${p.name}</a>`);
							})
							lastUnderBarPages.forEach(p=>{
								$(`#page-menu-column-2-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 p-0 m-0" href="interna?name=${p.url}" aria-expanded="false " id ="nav-bar-item">${p.name}</a>`);
							})
							underUnderBarPages.forEach(p=>{
								$(`#under-bar-category-${p.pageCategory.replace(/\s/g, '')}`).append(`<a class="mbr-black text-black dropdown-item display-4 " href="interna?name=${p.url}" >${p.name}</a>`);
							})

							$(".dropdown").mouseover((event)=>{$(event.currentTarget).addClass("open") })
							$(".dropdown").mouseout((event)=>{ $(event.currentTarget).removeClass("open") })
							$(".dropdown").mouseout((event)=>{ $(event.currentTarget).removeClass("open") })

						$(".nav-item").mouseenter((event)=>{
								$("js-float-line").append('<li class="main-menu-animated-line bottom"></li>')
								const left = $(event.currentTarget).position().left				
								const width = $(event.currentTarget).width()				
								$(".main-menu-animated-line ").attr("style",`width: ${width}px; left:${left}px;`)
				})		

						})
					})
					$.get(`https://intellgentcms.herokuapp.com/api/page?url=${getUrlParameter("name")}`,data=>{
						//console.log(data);
						$("#title").html(data.page.name);
						$("#page-title").html(data.page.name);

						$("#banner").css("background",`url("${data.page.image}")`);
						$("#banner-description").css("background",`url("${data.page.image}")`);
						data.page.sections.forEach((s,i)=>{
							$("#sectioncontainer").append(`<div class = 'section' id= 'section${i}' ></div>`);
							$(`#section${i}`).append(`<p class = 'section-title'>${s.title}</p>`);
							$(`#section${i}`).append(`<h3 class='mbr-section-subtitle mbr-fonts-style mb-4 mbr-light display-5 section-content'>${s.content}</h3>`);
							$(`#section${i}`).append(`<div class = 'section-img-container'></div>`);

							s.images.forEach((img,j)=>{
								$(".section-img-container").append(`<img class = 'section-img' src = ${img}></img>`);


							})
						})

					})

			});