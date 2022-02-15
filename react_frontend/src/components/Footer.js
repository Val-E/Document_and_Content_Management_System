export const Footer = () => {
  /* Footer HTML */
  return (
    <footer className="d-none d-lg-block footer sticky-bottom mt-auto py-3 bg-light container-fluid" role="alert">
      <center>
        <span className="text-muted">&copy; 2021 Valentin Svet </span>
        <span> &lt;valentin.svet.12345@gmail.com&gt; </span>
        <span>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-content={`
              Redistribution and use in source and binary forms,
              with or without modification, are permitted provided that the following conditions are met:
              1. Redistributions of source code must retain the above copyright notice,
                 this list of conditions and the following disclaimer.
              2. Redistributions in binary form must reproduce the above copyright notice,
                 this list of conditions and the following disclaimer in the documentation
                 and/or other materials provided with the distribution.
              3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse
                 or promote products derived from this software without specific prior written permission.
              THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
              "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
              INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
              MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
              IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
              FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
              (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
              LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
              WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
              IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
            `}
          >
            License
          </button>
        </span>
      </center>
    </footer>
  );
}
